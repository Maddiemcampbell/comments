import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Comment from './components/Comment';

const App = () => {
  const [newText, setNewText] = useState('');
  const [newImage, setNewImage] = useState('');
  const [sortedComments, setSortedComments] = useState([]);
  const [filter, setFilter] = useState('recent');
  const [loading, setLoading] = useState(false);

  const renderCommentsRecursively = (comments, parentId) => {
    return comments.map(comment => (
      <Comment
        key={comment.id}
        comment={comment}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
      >
        {comment.replies && comment.replies.length > 0 && (
          <div className="comment-replies">
            {renderCommentsRecursively(comment.replies, comment.id)}
          </div>
        )}
      </Comment>
    ));
  };

  const handleEditComment = async (id) => {
    const newComments = [...sortedComments];
    const commentIndex = newComments.findIndex((comment) => comment.id === id);
    const updatedText = prompt('Enter the new text:', newComments[commentIndex].text);
    
    if (updatedText !== null) {
      try {
        await axios.put(`http://localhost:8000/edit_comment/${id}/`, {
          text: updatedText,  // Align with the expected field name 'text'
        });
        newComments[commentIndex].text = updatedText;
        setSortedComments(newComments);
      } catch (error) {
        console.error('Error editing comment:', error);
      }
    }
  };

  const handleAddComment = async () => {
    if (!newText) {
      alert('Please enter a comment text.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/add_comment/', {
        text: newText,
        image: newImage,
        author: 'Admin'
      });
      fetchCommentsData();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this comment?');
    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:8000/delete_comment/${id}/`);
        fetchCommentsData();
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const sortComments = (commentsArray) => {
    return commentsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const fetchCommentsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/list_comments/');
      console.log("API Response:", response); 
      if (response.status >= 200 && response.status < 300) {
        const responseData = await response.data;
        const commentsArray = Array.isArray(responseData.comments) ? responseData.comments : [];
        const sortedComments = sortComments(commentsArray);
        setSortedComments(sortedComments);
        console.log("sorted comments:", sortedComments);
      } else {
        console.error('Error fetching comments. Server returned an error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCommentsData();
  }, []); 

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={2}
        border={1}
        borderRadius={8}
        borderColor="grey.300"
        maxWidth={700}
        margin="20px auto"
      >
        <h3>Add New Comment</h3>
        <TextField
          label="Comment"
          variant="outlined"
          fullWidth
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </Box>
      <Box marginTop={2}>
        <label>Filter Comments:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="recent">Most Recent</option>
          <option value="liked">Most Liked</option>
        </select>
      </Box>
      <div className="comments-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          renderCommentsRecursively(sortedComments)
        )}
      </div>
    </div>
  );
};

export default App;
