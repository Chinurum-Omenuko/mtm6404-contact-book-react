
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './db';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');


  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, 'contacts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const contact = docSnap.data();
          setFirstName(contact.firstName);
          setLastName(contact.lastName);
          setEmail(contact.email);
          setNumber(contact.number);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const updatedContact = {
      firstName,
      lastName,
      email,
      number,
    };

    try {
      const docRef = doc(db, 'contacts', id);
      await updateDoc(docRef, updatedContact);
      console.log("Contact successfully updated!");


      navigate('/');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, 'contacts', id);
      await deleteDoc(docRef);
      console.log("Contact successfully deleted!");
      navigate('/');
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <a href="#" className="text-blue-600 text-sm mb-4 block" onClick={() => navigate('/')}>
        &lt; Contacts
      </a>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Contact</h1>

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
            placeholder="Phone Number"
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
            Update Contact
          </button>
          <button
            type="button"
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
            onClick={handleDelete}
          >
            Delete Contact
          </button>
          <button
            type="button"
            className="text-gray-600 py-2 px-4 rounded-md hover:underline"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
