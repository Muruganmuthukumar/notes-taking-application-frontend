import React from 'react'

function Card({ handleDeleteNote, editingId, setShow, show}) {
    const handleClick=()=>{
        handleDeleteNote(editingId)
        setShow(!show)
    }
    const handleClick2=()=>{
        setShow(!show)
    }
  return (
    <>
        <div>
            <h2>are you sure want to delete this note?</h2>
            <button onClick={handleClick}>Yes</button>
            <button onClick={handleClick2}>No</button>
        </div>
    </>
  )
}

export default Card