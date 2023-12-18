// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Comment from './components/Comment';

const App = () => {
  const [comments, setComments] = useState([]);
  const [newText, setNewText] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);
  //  set api to use .env on frontend
  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/list_comments/');
      
      // Ensure the response status is okay (2xx)
      if (response.status >= 200 && response.status < 300) {
        const responseData = await response.data;
        setComments(responseData.comments);
      } else {
        console.error('Error fetching comments. Server returned an error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleEditComment = async (id) => {
    const newComments = [...comments];
    const commentIndex = newComments.findIndex((comment) => comment.id === id);
    const updatedText = prompt('Enter the new text:', newComments[commentIndex].text);
    
    if (updatedText !== null) {
      try {
        await axios.put(`http://localhost:8000/edit_comment/${id}/`, {
          text: updatedText,  // Align with the expected field name 'text'
        });
        newComments[commentIndex].text = updatedText;
        setComments(newComments);
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
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this comment?');
    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:8000/delete_comment/${id}/`);
        fetchComments();
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

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
      <div className="comments-container">
        {comments.map(comment => (
          <Comment
          key={comment.id}
          comment={comment}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default App;