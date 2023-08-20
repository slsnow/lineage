import React from 'react';
import Modal from 'react-modal';
import PersonForm from './PersonForm';
import './PersonModal.css';

export default function PersonModal({isOpen, onRequestClose}) {

  const handleFormSubmit = async (formData) => {
    try {
      // Use a relative URL since you've set up the proxy in your package.json
      const response = await fetch('/api/addPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Data saved successfully:", result);
        onRequestClose(); // Close the modal if data is saved successfully
      } else {
        console.error("Error saving data:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false} 
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: {
          position: 'relative', 
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          padding: '20px',
          border: '1px solid #ccc',
          overflow: 'auto',
          borderRadius: '15px',
          fontSize: '0.8em',
        }
      }}
    >
      <button className="close-button" onClick={onRequestClose}>X</button>
      <h2>Add Person</h2>
      <PersonForm onFormSubmit={handleFormSubmit} />
      <div className="modal-buttons">
        <button onClick={onRequestClose}>Cancel</button>
        {/* The actual submission now happens within the PersonForm, so no need for a separate submit button here. */}
      </div>
    </Modal>
  );
}
