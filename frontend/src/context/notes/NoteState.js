import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_HOST;
  console.log(host, 'host')
  const notesinitial = []
  const [notes, setNotes] = useState(notesinitial)
  // Get all Note:
  const getNote = async () => {
    // Api Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    // Logic to Get all note
    const json = await response.json();
    setNotes(json);
  }

  // ADD a Note:
  const addNote = async (title, description, tag) => {
    // TODO Api Calls
    // Api Call for adding note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note:
  const deleteNote = async (id) => {
    //  Api Calls for deleting note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
    // Logic to delte note in client-side
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }
  // Edit a Note
  const updateNote = async (id, title, description, tag) => {
    // Api Call for updating note
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit note in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }


  return <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNote }}>
    {props.children}
  </NoteContext.Provider>
}

export default NoteState