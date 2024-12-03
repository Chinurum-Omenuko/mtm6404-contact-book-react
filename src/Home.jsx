import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Container, ListGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";
import { Route, Routes } from 'react-router-dom';
import { db } from './db'
import './index.css';

export default function App() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));

        const contactsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),

        }));
        console.log(contactsData);
        setContacts(contactsData);

      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>


      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'gray' }}>Contacts</h1>
        <button
          style={{ fontSize: '20px', fontWeight: 'bold' }}
          onClick={() => navigate('/create')}
        >
          +
        </button>
      </div>



      <div style={{ width: '100%' }}>
        <input
          type="text"
          placeholder="Search"
          style={{ width: '100%', border: '1px solid', borderColor: 'gray', borderRadius: '4px', paddingY: '8px', paddingX: '16px', color: 'gray', outline: 'none' }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredContacts.map(contact => (
        <ContactCard
          key={contact.id}
          id={contact.id}
          name={contact.firstName}
          lastName={contact.lastName}
        />
      ))}
    </div>

);
}