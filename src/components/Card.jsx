import React from 'react'
import '../styles/Card.css'
function Card({ handleDeleteNote, editingId, setShow, show}) {
    const handleClick=()=>{
        handleDeleteNote(editingId)
        setShow(!show)
    }
    const handleClick2=()=>{
        setShow(!show)
    }
  return (
    <div className='card-container'>
        <div className='card'>
            <div>
                <p>are you sure want to delete this note?</p>
            </div>
            <div className='btn-container'>
                <button onClick={handleClick}>Yes</button>
                <button onClick={handleClick2}>No</button>
            </div>
        </div>
    </div>
  )
}

export default Card