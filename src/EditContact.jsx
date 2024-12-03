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
    <div style={{ maxWidth: '32rem', margin: '0 auto', padding: '1.5rem' }}>
      <a href="#" style={{ color: '#2563eb', fontSize: '0.875rem', marginBottom: '1rem', display: 'block' }} onClick={() => navigate('/')}>
        &lt; Contacts
      </a>

      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Edit Contact</h1>

      <form style={{ marginBottom: '1rem' }} onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridGap: '1rem', '@media(min-width: 640px)': { gridTemplateColumns: '1fr 1fr' } }}>
          <input
            type="text"
            placeholder="First Name"
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              color: '#4b5563',
              outline: 'none',
              focus: {
                outline: 'none',
                boxShadow: '0 0 0 2px #2563eb',
              },
            }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              color: '#4b5563',
              outline: 'none',
              focus: {
                outline: 'none',
                boxShadow: '0 0 0 2px #2563eb',
              },
            }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridGap: '1rem', '@media(min-width: 640px)': { gridTemplateColumns: '1fr 1fr' } }}>
          <input
            type="email"
            placeholder="Email"
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              color: '#4b5563',
              outline: 'none',
              focus: {
                outline: 'none',
                boxShadow: '0 0 0 2px #2563eb',
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              color: '#4b5563',
              outline: 'none',
              focus: {
                outline: 'none',
                boxShadow: '0 0 0 2px #2563eb',
              },
            }}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              transition: 'background-color 0.3s',
              ':hover': { backgroundColor: '#1d4ed8' },
            }}
          >
            Update Contact
          </button>
          <button
            type="button"
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              transition: 'background-color 0.3s',
              ':hover': { backgroundColor: '#b91c1c' },
            }}
            onClick={handleDelete}
          >
            Delete Contact
          </button>
          <button
            type="button"
            style={{
              color: '#4b5563',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              ':hover': { textDecoration: 'underline' },
            }}
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