import React, { useState } from 'react';
import PersonModal from '../components/PersonModal';
import './People.css';

export default function People() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className = "people-container">
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 className="header">People</h1>
        <p>Lorem ipsum dolor sit amet...</p>
        <button onClick={() => setShowForm(true)}>Add Person</button>
        <PersonModal isOpen={showForm} onRequestClose={() => setShowForm(false)} />
      </div>
    </div>
  );
}