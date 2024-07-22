import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const BookForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/books', data);
      reset(); // Clear the form after submission
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add a New Book
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register('title', { required: true })}
          />
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            {...register('author', { required: true })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...register('description')}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Book
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BookForm;
