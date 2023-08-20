import React, { useState } from 'react';
import FormInput from './FormInput';
import './FormInput.css';
import './PersonForm.css';

export default function PersonForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    firstNames: '',
    lastNames: '',
    sex: 'Unknown',
    status: 'Living',
    birthDate: '',
    birthplace: '',
    deathDate: '',
    deathplace: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <div className="names-container">
        <FormInput 
          label="First Names" 
          type="text" 
          onChange={(e) => handleInputChange('firstNames', e.target.value)} 
        />
        <FormInput 
          label="Last Names" 
          type="text" 
          onChange={(e) => handleInputChange('lastNames', e.target.value)} 
        />
      </div>
      <div className="sex-container">
        <FormInput 
          label="Sex" 
          name="sex"  // Added name attribute for radio group
          type="radio" 
          options={["Male", "Female", "Unknown"]} 
          defaultValue={formData.sex}  // Provide current selected value
          onChange={(e) => handleInputChange('sex', e.target.value)}
        />
      </div>
      <div className="status-container">
        <FormInput 
          label="Status" 
          name="status"  // Added name attribute for radio group
          type="radio" 
          options={["Deceased", "Living"]} 
          defaultValue={formData.status}  // Provide current selected value
          onChange={(e) => handleInputChange('status', e.target.value)} 
        />
      </div>
      <div className="birth-container">
        <FormInput 
          label="Birth Date" 
          type="date" 
          onChange={(e) => handleInputChange('birthDate', e.target.value)}
        />
        <FormInput 
          label="Birthplace" 
          type="text" 
          onChange={(e) => handleInputChange('birthplace', e.target.value)}
        />
      </div>
      {formData.status === "Deceased" && (
        <div className="death-container">
          <FormInput 
            label="Death Date" 
            type="date" 
            onChange={(e) => handleInputChange('deathDate', e.target.value)}
          />
          <FormInput 
            label="Deathplace" 
            type="text" 
            onChange={(e) => handleInputChange('deathplace', e.target.value)}
          />
        </div>
      )}
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
