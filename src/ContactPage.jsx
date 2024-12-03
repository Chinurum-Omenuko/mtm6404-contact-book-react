import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./db";

const ContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, 'contacts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContact(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]);

  if (!contact) {
    return <p>Loading contact details...</p>;
  }

  return (
    <div style={{ maxWidth: '24rem', margin: '2.5rem auto', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
      <div
        onClick={() => navigate('/')}
        style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem', cursor: 'pointer' }}
      >
        &lt; Contacts
      </div>

      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
          {contact.firstName} {contact.lastName}
        </h1>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Email</p>
          <p style={{ color: '#374151', fontWeight: '500' }}>{contact.email}</p>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Phone</p>
          <p style={{ color: '#374151', fontWeight: '500' }}>{contact.number}</p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/edit/${id}`)}
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#3b82f6', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'underline' }}
      >
        Edit
      </button>
    </div>
  );
};

export default ContactPage;