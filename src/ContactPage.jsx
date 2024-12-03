import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./db"; // Ensure your Firebase setup is imported

const ContactPage = () => {
  const { id } = useParams(); // This is the Firestore documentId
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, 'contacts', id); // Use documentId directly
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
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-md rounded-lg border border-gray-200 p-6">
      <div
        className="text-blue-600 text-sm font-medium mb-4"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        &lt; Contacts
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {contact.firstName} {contact.lastName}
        </h1>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-gray-700 font-medium">{contact.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-gray-700 font-medium">{contact.number}</p>
        </div>
      </div>
      
      <button
        className="absolute top-6 right-6 text-blue-600 text-sm font-medium hover:underline"
        onClick={() => navigate(`/edit/${id}`)}
      >
        Edit
      </button>
    </div>
  );
};

export default ContactPage;
