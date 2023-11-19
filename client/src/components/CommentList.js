// CommentList.js
import React, {useState} from 'react';
import Comment from './Comment';
import { StyledCommentList } from './StyleSheets/CommentStyles';
const sampleComments = [
  {
    _id: '1',
    author: 'MapLover42',
    text: 'This map is incredibly detailed. Great work!',
    timestamp: '2023-11-01T09:24:00.000Z'
  },
  {
    _id: '2',
    author: 'GeoGeek',
    text: 'Does anyone have recommendations for similar maps?',
    timestamp: '2023-11-02T10:35:00.000Z'
  },
  {
    _id: '3',
    author: 'HistoryBuff1912',
    text: 'I love the historical accuracy of this map.',
    timestamp: '2023-11-03T15:15:00.000Z'
  },
  {
    _id: '4',
    author: 'NatureWalker',
    text: 'Used this on my hike last weekend, it was super helpful.',
    timestamp: '2023-11-04T08:50:00.000Z'
  },
  {
    _id: '5',
    author: 'UrbanExplorer',
    text: 'I found some really cool hidden spots with this. Thanks!',
    timestamp: '2023-11-05T12:33:00.000Z'
  },
  {
    _id: '6',
    author: 'CartographerCat',
    text: 'The scale is perfect and the topographic lines are spot on.',
    timestamp: '2023-11-05T18:47:00.000Z'
  },
  {
    _id: '7',
    author: 'TrailTrekker',
    text: 'Is there a version of this map that includes bike trails?',
    timestamp: '2023-11-06T09:22:00.000Z'
  },
  {
    _id: '8',
    author: 'BackpackerBecky',
    text: 'Wow, the color coding on this map makes it so easy to read.',
    timestamp: '2023-11-07T05:44:00.000Z'
  },
  {
    _id: '9',
    author: 'LostInWoods',
    text: 'Could use some more landmarks, but otherwise, its a fantastic resource.',
    timestamp: '2023-11-07T14:30:00.000Z'
  },
  {
    _id: '10',
    author: 'RangerRick',
    text: 'As a park ranger, I appreciate the attention to detail. This will be useful for our visitors.',
    timestamp: '2023-11-08T16:54:00.000Z'
  }
];

const CommentList = ({ map,commentsList }) => {
  const [comments, setComments] = useState([]);
  console.log(comments)
  /*useEffect(() => {
    // Replace with your actual API endpoint
    fetch(`/api/maps/${mapId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [mapId]);*/
  console.log("what is inside comment list:: ", map.reactions.comments)
  console.log("this is what was passed: ", commentsList)

  if (commentsList.length === 0) {
    return null;
  }

  return (
    <StyledCommentList>
      {commentsList.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </StyledCommentList>
  );
};

export default CommentList;
