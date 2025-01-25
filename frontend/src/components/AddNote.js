import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handelClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showAlert("Added Successfully", "success")
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-2">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Enter description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handelClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
