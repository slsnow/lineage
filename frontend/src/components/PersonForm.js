import React, { useState } from 'react';
import FormInput from './FormInput';
import './FormInput.css';
import './PersonForm.css';


export default function PersonForm() {
  const [status, setStatus] = useState("Living");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  }

  return (
    <form className="person-form">
      <div className="names-container">
        <FormInput label="First Names" type="text" />
        <FormInput label="Last Names" type="text" />
      </div>
      <div className="sex-container">
        <FormInput label="Sex" type="radio" options={["Male", "Female", "Unknown"]} />
      </div>
      <div className="status-container">
        <FormInput label="Status" type="radio" options={["Deceased", "Living"]} />
      </div>
      <div className="birth-container">
        <FormInput label="Birth Date" type="date" />
        <FormInput label="Birthplace" type="text" />
      </div>
      <div className="death-container">
        <FormInput label="Death Date" type="date" />
        <FormInput label="Deathplace" type="text" />
      </div>
    </form>
  );
}