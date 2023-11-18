import React from 'react';
import NoteForm from '../components/NoteForm';
import { useNavigate } from "react-router-dom";

const NewNote = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); 
  const handleCreateNote = async (formData) => {
    formData.userId = userId;
    const response = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      console.log('Note created successfully!');
      navigate('/home')
    } else {
      console.error('Failed to create note');
    }
  };

  return (
    <div>
      <h2>New Note</h2>
      <NoteForm onSubmit={handleCreateNote} buttonClass="button-create"/>
    </div>
  );
};

export default NewNote;
