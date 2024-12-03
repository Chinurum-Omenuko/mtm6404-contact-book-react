import React from 'react';
import { Link } from "react-router-dom";

const ContactCard = ({ key, id, name, lastName }) => {
  return (
  <Link to={`/card/${id}`}>
      <div className="w-full border border-gray-300 rounded-md py-2 px-4">
        <p className="text-gray-700 text-lg">{name} {lastName}</p>
      </div>
  </Link>
  );
};

export default ContactCard;