import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { db } from './db';



const NewContactForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new contact object
    const newContact = {
      firstName,
      lastName,
      email,
      number,
    };
  
    try {
      
      await addDoc(collection(db, 'contacts'), newContact);
      console.log("Contact successfully written!");
  
      setFirstName('');
      setLastName('');
      setEmail('');
      setNumber('');
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };


  return (
    <div className="max-w-xl mx-auto p-6">

      
      <a href="/" className="text-blue-600 text-sm mb-4 block">&lt; Contacts</a>
      


      <h1 className="text-3xl font-bold text-gray-800 mb-6">New Contact</h1>


      <form className="space-y-4" onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="number"
            className="border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>





        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Add Contact
          </button>
          
          <button
            type="button"
            className="text-gray-600 py-2 px-4 rounded-md hover:underline"
            onClick={() => window.location.href = '/'}
          >
            Cancel
          </button>
        
        </div>
      </form>
    </div>
  );
};

export default NewContactForm;