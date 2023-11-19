import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import "../styles/NoteForm.css";
import { useNavigate } from 'react-router-dom';

const NoteForm = ({ initialValues, onSubmit }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: [],
    ...initialValues,
  });
  const navigate = useNavigate();
  useEffect(() => {
    setNote({
      ...note,
      ...initialValues,
    }); // eslint-disable-next-line
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleTagsChange = (newTags, { action, removedValue }) => {
    if (action === "create-option") {
      setNote({
        ...note,
        tags: [...note.tags, newTags[newTags.length - 1].value],
      });
    } else if (action === "remove-value" && removedValue.__isNew__) {
      setNote({
        ...note,
        tags: note.tags.filter((tag) => tag !== removedValue.value),
      });
    } else {
      setNote({ ...note, tags: newTags.map((tag) => tag.value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(note);
  };

  const setBack = ()=>{
    navigate('/home')
  }

  return (
    <section className="noteform-container">
      <div className="noteform">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
          />

          <label>Content</label>
          <textarea rows={15} name="content" value={note.content} onChange={handleChange} />

          <label>Tags</label>
          <CreatableSelect
            isMulti
            onChange={handleTagsChange}
            options={note.tags.map((tag) => ({ value: tag, label: tag }))}
          />

            <button type="submit" className="button-create">
              Save
            </button>
              <button type="button" onClick={setBack} className="back-btn">
                  Back
              </button>
        </form>
      </div>
    </section>
  );
};

export default NoteForm;
