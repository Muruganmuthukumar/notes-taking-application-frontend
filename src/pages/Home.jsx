import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem("userId");
  // console.log(userId);
  const navigate = useNavigate(); 
  const [show, setShow]=useState(false);
  const [editingId, setEditingId]=useState('');

  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const handleAddNote = () => {
    navigate('/new')
  };

  console.log(notes);

  const handleEditClick = (id) => {
      navigate(`/${id}/edit`);
  };

  const handleDeleteNote = (id) => {
    fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  const handleShow = (id)=>{
    setEditingId(id);
    console.log(id);
    setShow(!show)
  }

  return (
    <>
      <main>
        <h1>Notes App</h1>
        <button onClick={handleAddNote}>Add</button>
        <div>
        {show&&<Card handleDeleteNote={handleDeleteNote}  editingId={editingId} show={show} setShow={setShow}/>}
        <h2>Notes</h2>
        <ul>
          {notes.map((note, i) => (
            <li key={i}>
              <div>
                <strong>{note.title}</strong>
                <p>{note.content}</p>
              </div>
              <div>
                {note.tags.map((tag)=>(
                  <><p>tag {tag}</p></>
                ))}
              </div>
              <div>
                <button onClick={() => handleEditClick(note._id)}>Edit</button>
                <button onClick={()=>handleShow(note._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </main>
    </>
  );
}

export default Home;
