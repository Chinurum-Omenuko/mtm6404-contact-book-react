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
    <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '1.5rem' }}>


      <a href="/" style={{ color: '#1D4ED8', fontSize: '0.875rem', marginBottom: '1rem', display: 'block' }}>&lt; Contacts</a>



      <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1F2937', marginBottom: '1.5rem' }}>New Contact</h1>


      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1rem' }}>
          <input
            type="text"
            placeholder="First Name"
            style={{ border: '1px solid #D1D5DB', borderRadius: '0.375rem', padding: '0.5rem 1rem', color: '#4B5563', outline: 'none', transition: 'box-shadow 0.3s', boxShadow: 'inset 0 0 0 0 transparent', ':focus': { boxShadow: '0 0 0 0.2rem rgba(37, 99, 235, 0.3)' } }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            style={{ border: '1px solid #D1D5DB', borderRadius: '0.375rem', padding: '0.5rem 1rem', color: '#4B5563', outline: 'none', transition: 'box-shadow 0.3s', boxShadow: 'inset 0 0 0 0 transparent', ':focus': { boxShadow: '0 0 0 0.2rem rgba(37, 99, 235, 0.3)' } }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>


        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            style={{ border: '1px solid #D1D5DB', borderRadius: '0.375rem', padding: '0.5rem 1rem', color: '#4B5563', outline: 'none', transition: 'box-shadow 0.3s', boxShadow: 'inset 0 0 0 0 transparent', ':focus': { boxShadow: '0 0 0 0.2rem rgba(37, 99, 235, 0.3)' } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="number"
            style={{ border: '1px solid #D1D5DB', borderRadius: '0.375rem', padding: '0.5rem 1rem', color: '#4B5563', outline: 'none', transition: 'box-shadow 0.3s', boxShadow: 'inset 0 0 0 0 transparent', ':focus': { boxShadow: '0 0 0 0.2rem rgba(37, 99, 235, 0.3)' } }}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>





        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="submit"
            style={{ backgroundColor: '#1D4ED8', color: '#FFFFFF', padding: '0.5rem 1rem', borderRadius: '0.375rem', transition: 'background-color 0.3s', ':hover': { backgroundColor: '#2563EB' } }}
          >
            Add Contact
          </button>

          <button
            type="button"
            style={{ color: '#4B5563', padding: '0.5rem 1rem', borderRadius: '0.375rem', ':hover': { textDecoration: 'underline' } }}
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