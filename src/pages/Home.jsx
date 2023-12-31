import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Card from "../components/Card";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState("");
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch("http://localhost:5000/api/notes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "user-id": userId,
      },
    })
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
      // eslint-disable-next-line
  }, []);
// console.log(notes);
  const handleAddNote = () => {
    navigate("/new");
  };

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

  const handleShow = (id) => {
    setEditingId(id);
    setShow(!show);
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const filteredNotes = notes
    ? notes.filter((note) =>
        selectedTags.length === 0
          ? true
          : selectedTags.some((tag) => note.tags.includes(tag.value))
      )
    : [];

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags))).map(
    (tag) => ({
      label: tag,
      value: tag,
    })
  );

  return (
    <>
      <main className="main-container">
        <div className="main-content">
          <div className="add-btn-container">
            <button className="add-button" onClick={handleAddNote}>
              Add Note
            </button>
          </div>
          <div className="search-container">
            <Select
              className="tag-select"
              options={allTags}
              isMulti
              placeholder="Filter by tags"
              value={selectedTags}
              onChange={handleTagChange}
            />
          </div>
          <div>
            {show && (
              <Card
                handleDeleteNote={handleDeleteNote}
                editingId={editingId}
                show={show}
                setShow={setShow}
              />
            )}
            <h2 className="notes-heading">Notes</h2>
            {filteredNotes.length === 0 ? (
              <p className="no-notes-message">
                No notes found. Create a new note!
              </p>
            ) : (
              <ul className="notes-list">
                <Note
                  notes={filteredNotes}
                  handleEditClick={handleEditClick}
                  handleShow={handleShow}
                />
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
