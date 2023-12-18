import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Comment = ({ comment, onEdit, onDelete }) => {
    const formattedDate = new Date(comment.date).toLocaleString();
    return (
        <Box
            key={comment.id}
            className="comment"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            border={1}
            borderRadius={8}
            borderColor="grey.300"
            padding={2}
            marginBottom={2}
        >
            {/* Text and Image */}
            <Box
                className="comment-content"
                display="flex"
                flexDirection="row"
                alignItems="center"
                width="100%"
                marginBottom={1}
            >
                {comment.image && (
                    <img src={comment.image} alt="Comment" width="200px" style={{ marginRight: '8px' }} />
                )}
                <Typography variant="body1" component="p">
                    {comment.text}
                </Typography>
            </Box>

            {/* Author, Likes, and Date */}
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                width="100%"
                justifyContent="start"
            >
                <Typography variant="subtitle1" component="p" paddingRight={"20px"}>
                    {comment.author}
                </Typography>
                <Typography variant="body2" className="comment-likes" paddingRight={"20px"}>
                    Likes: {comment.likes}
                </Typography>
                <Typography variant="body2">
                    {formattedDate}
                </Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                width="100%"
                justifyContent="start"
            >
                <Button variant="outlined" color="primary" onClick={() => onEdit(comment.id)} style={{ marginRight: '25px' }}>
                    Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => onDelete(comment.id)}>
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default Comment;