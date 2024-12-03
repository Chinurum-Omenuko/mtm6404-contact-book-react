import React from 'react';
import { Link } from "react-router-dom";

const ContactCard = ({ key, id, name, lastName }) => {
  return (
  <Link to={`/card/${id}`}>
      <div style={{ width: '100%', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '8px 16px' }}>
        <p style={{ color: '#4B5563', fontSize: '18px' }}>{name} {lastName}</p>
      </div>
  </Link>
  );
};

export default ContactCard;