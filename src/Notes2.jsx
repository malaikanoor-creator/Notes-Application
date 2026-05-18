import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react'


const Notes2 = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // SAVE data
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

//  useEffect(() => {
//     const saved = localStorage.getItem('notes');
//     const savedNotes = saved ? JSON.parse(saved) : [];
//     setNotes(savedNotes);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('notes', JSON.stringify(notes));
//   }, [notes]);


  const handleAddNote = () => {
    if (title === '' || description === '') {
      alert('Please fill all the fields');
      return;
    }
    const newNote = {
      title: title,
      description: description,
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setDescription('');
  };

  return (
    <div className='min-h-screen text-black bg-linear-to-l from-green-500 to-blue-800 p-8'>
      <div className='max-w-xl text-black mx-auto bg-white shadow-lg rounded-xl p-8'>
        <h1 className='text-4xl text-black text-center font-bold mb-6'>Notes App</h1>
        <input
          type='text'
          placeholder='Enter Note Title'
          className='w-full border rounded-lg p-3 mb-6 outline-none'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          rows='5'
          placeholder='Write Your notes here'
          className='w-full text-black p-3 border rounded-lg mb-3 outline-none resize-none'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className='w-full bg-blue-500 text-white rounded-lg hover:bg-blue-700 cursor-pointer'
          onClick={handleAddNote}
        >
          Add Notes
        </button>
      </div>
      <div className='max-w-xl mx-auto mt-8'>
        {notes.map((item, index) => (
          <div key={index} className='bg-white shadow-md rounded mb-4 p-4'>
            <h2 className='font-bold text-xl mb-3'>{item.title}</h2>
            <p className='text-md font-medium'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes2;




// import React, { useEffect, useState } from 'react';

// const Notes2 = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [notes, setNotes] = useState([]);

//   // Load saved notes
//   useEffect(() => {
//     const saved = localStorage.getItem('notes');
//     const savedNotes = saved ? JSON.parse(saved) : [];
//     setNotes(savedNotes);
//   }, []);

//   // Save notes
//   useEffect(() => {
//     localStorage.setItem('notes', JSON.stringify(notes));
//   }, [notes]);

//   const handleAddNote = () => {
//     if (!title || !description) {
//       alert('Please fill all fields');
//       return;
//     }

//     const newNote = {
//       title,
//       description,
//     };

//     setNotes([...notes, newNote]);
//     setTitle('');
//     setDescription('');
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-l from-green-500 to-blue-800 p-8">
//       <div className="max-w-xl mx-auto text-black bg-white shadow-lg rounded-xl p-8">
//         <h1 className="text-4xl  text-black text-center font-bold mb-6">Notes App</h1>

//         <input
//           type="text"
//           placeholder="Enter Note Title"
//           className="w-full rounded-lg p-3 mb-6 outline-none border"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           rows="5"
//           placeholder="Write your notes here"
//           className="w-full p-3 border rounded-lg mb-3 outline-none resize-none"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></textarea>

//         <button
//           className="w-full bg-blue-500 text-black rounded-lg py-3 hover:bg-blue-700 cursor-pointer "
//           onClick={handleAddNote}
//         >
//           Add Note
//         </button>
//       </div>

//       <div className="max-w-xl mx-auto mt-8 text-black">
//         {notes.map((item, index) => (
//           <div key={index} className="bg-white shadow-md rounded mb-4 p-4">
//             <h2 className="font-bold text-xl mb-3">{item.title}</h2>
//             <p className="text-md font-medium">{item.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notes2;