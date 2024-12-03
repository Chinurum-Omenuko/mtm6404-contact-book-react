import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Route, Routes } from 'react-router-dom';
import Home from './Home'
import NewContactForm from './NewContactForm'
import ContactPage from "./ContactPage";
import './index.css';
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts] = useState([]);

  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<ContactPage />} />
        <Route path="/create" element={<NewContactForm />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </div>

    


    

    

  );
}

export default App;
