const auth = require('../auth')
const User = require('../models/user-model')
const Token = require("../models/token-model");
const bcrypt = require('bcryptjs')
const crypto = require("crypto");
const sendEmail = require("../utils/sendRecoveryEmail");
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test(email))
    return emailRegex.test(email);
};


getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });
        // console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: loggedInUser,

        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("LOGGING IN")
        console.log("fields: " + username + password)

        if (!username || !password) {
            return res
                .status(400)
                .json({         
                    success: false,
                    errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ username: username });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    success: false,
                    errorMessage: "Wrong username or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    success: false,
                    errorMessage: "Wrong username or password provided."
                })
        }

        console.log("id: " + existingUser._id)
        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: existingUser,
        })
        //return res

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

deleteUserAccount = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Deleting an account")
        console.log("fields: " + email)


        const existingUser = await User.findOneAndDelete({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    success: false,
                    errorMessage: "User not found."
                })
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    return res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).status(200).json({ success: true, message: 'Logged out successfully' });
}

resetUserPassword = async (req, res) => {
    try{
        const { userId, token, password } = req.body;
        console.log(userId + token + password)
        let passwordResetToken = await Token.findOne({ userId });
        if (!passwordResetToken) {
            throw new Error("Invalid or expired password reset token");
        }

        console.log(token)
        console.log(passwordResetToken.token)
        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) {
            throw new Error("Invalid or expired password reset token");
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        await User.updateOne(
            { _id: userId },
            { $set: { passwordHash: hash } },
            { new: true }
        );
        await passwordResetToken.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully."
        });
    }
    catch (err){
        console.error(err);
        res.status(500).send();
    }

};

recoverPassword = async(req,res) => {
    try {
        const {email} = req.body;
        console.log(email + " Requesting email");
        if (!email) {
            return res.status(400)
            .json({ 
                success: false,
                errorMessage: "Please enter an email."});
        }

        let existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser); 
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    success: false,
                    errorMessage: "An account with this email address does not exist."
                })
        }
        let token = await Token.findOne({ userId: existingUser._id });
        if (token) await token.deleteOne();
        let resetToken = crypto.randomBytes(32).toString("hex");

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(resetToken, salt);

        await new Token({
            userId: existingUser._id,
            token: hash,
            createdAt: Date.now(),
        }).save();
        console.log(existingUser._id)
        console.log(resetToken)
        let link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${existingUser._id}`;

        sendEmail(existingUser.email, link);
        return res.status(200).json({
            success: true,
            message: "An email has been sent successfully."
        });

    }catch (err) {
        console.error("ERROR " + err);
        res.status(500).send();
    }

}
registerUser = async (req, res) => {
    try {
        const { email, username, password, passwordVerify } = req.body;
        if (!email || !username || !password || !passwordVerify ) {
            return res
                .status(400)
                .json({ 
                    success: false,
                    errorMessage: "Please enter all required fields." });
        }
        if (isValidEmail(email) === false){
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Invalid email format, please try again."
                });
            
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password verify match");
        let existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        existingUser = await User.findOne({ username: username });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const bio = "I'm a new user!";
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({
            email, username, passwordHash, bio
        });
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

        // LOGIN THE USER
        const token = auth.signToken(savedUser._id);
        console.log("token:" + token);
        console.log(newUser)

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: newUser
        })

        console.log("token sent");

    } catch (err) {
        console.error("ERROR " + err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    recoverPassword,
    resetUserPassword,
    loginUser,
    logoutUser,
    deleteUserAccount
}
