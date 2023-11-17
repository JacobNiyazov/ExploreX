const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

async function editUserAccount(req, res) {
	try {
		const { username, email, bio, password } = req.body;

		const existingUserEmail = await User.findOne({ email: email });
		if (existingUserEmail) {
			return res
				.status(400)
				.json({
					success: false,
					errorMessage: "An account with this email address already exists."
				})
		}
		const existingUserUsername = await User.findOne({ username: username });
		if (existingUserUsername) {
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

		data = {username:username, email:email, bio:bio, passwordHash:passwordHash}
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			data,
			{ new: true }
		);

		if (updatedUser){
			return res.status(200).json({
				success: true,
				id: updatedUser._id,
				message: 'User details updated successfully!',
			})
		}
		else {
			return res.status(404).json({
				error,
				message: 'Failed to update user details.'
			})
		}

	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
}

module.exports = {
	editUserAccount,
}