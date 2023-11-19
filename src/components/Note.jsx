import React from 'react'
import "../styles/Note.css";

function Note({notes, handleShow, handleEditClick}) {
  return (
        <>
          {notes.map((note) => (
            <li key={note._id} className="note-item">
              <div>
                <h3 className='note-title'>{note.title}</h3>
              </div>
            <div className='note-content'>
                <p >{note.content}</p>
            </div>
              <h4>Tags</h4>
              <div className='tags'>
                {note.tags.map((tag, index) => (
                  <p className='tag' key={index}>{tag}</p>
                ))}
              </div>
              <div className='btn-container'>
                <button className="btn-2" onClick={() => handleEditClick(note._id)}>
                  Edit
                </button>
                <button className="btn-3 delete-button" onClick={() => handleShow(note._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
    </>
  )
}

export default Note