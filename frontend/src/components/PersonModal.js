import React from 'react';
import Modal from 'react-modal';
import PersonForm from './PersonForm';
import './PersonModal.css';

export default function PersonModal({isOpen, onRequestClose, onSubmit}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false} // This prevents closing the modal when clicking outside
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Add some opacity
        content: {
          position: 'relative', // Allows positioning of children
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '40%', // smaller width
          padding: '20px',
          border: '1px solid #ccc',
          overflow: 'auto',
          borderRadius: '15px',
          fontSize: '0.8em', // smaller font
        }
      }}
    >
      <button className="close-button" onClick={onRequestClose}>X</button> {/* Moved to the top right */}
      <h2>Add Person</h2>
      <PersonForm />
      <div className="modal-buttons">
        <button onClick={onRequestClose}>Cancel</button> {/* Cancel button */}
        <button onClick={onSubmit}>Submit</button> {/* Submit button */}
      </div>
    </Modal>
  );
}