import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { useNavigate } from 'react-router-dom';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialNoteData, setInitialNoteData] = useState(null);

  const fetchNoteById = async (noteId) => {
    const response = await fetch(`http://localhost:5000/api/notes/${noteId}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getNoteData = async () => {
      const initialNoteData = await fetchNoteById(id);
      setInitialNoteData(initialNoteData);
    };

    getNoteData();
  }, [id]);

  const handleSaveNote = async (formData) => {
    const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Note updated successfully!');
      navigate('/home')
    } else {
      console.error('Failed to update note');
    }
  };

  return (
    <div>
      <h2>Edit Note</h2>
      {initialNoteData && <NoteForm initialValues={initialNoteData} onSubmit={handleSaveNote} buttonClass="button-edit"/>}
    </div>
  );
};

export default EditNote;
