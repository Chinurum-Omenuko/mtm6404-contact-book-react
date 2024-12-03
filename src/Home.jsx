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
    <div className="flex flex-col items-center p-6">

     
      <div className="w-full flex flex-row justify-between items-center mb-4 border-solid border-2 border-red-500">
        <h1 className="text-3xl font-bold text-gray-800">Contacts</h1>
        <button
          className="text-blue-600 text-xl font-bold"
          onClick={() => navigate('/create')}
        >
          +
        </button>
      </div>
    


      <div className="w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
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