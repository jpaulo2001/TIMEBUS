import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const ContactList = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Array of contacts
  const contacts = [
    { name: 'Varela', email: 'john@example.com', phone: '1234567890', icon: "icon to call" },
    { name: 'AutoViacao', email: 'jane@example.com', phone: '9876543210' },
    { name: 'CRP', email: 'bob@example.com', phone: '5555555555' }
  ];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      width: '90%',
      maxHeight: '80%',
      padding: '20px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
      overflow: 'auto'
    }
  };

  const buttonStyles = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none'
  };

  return (
    <div>
      <h1>Contact List</h1>
      <button style={buttonStyles} onClick={openModal}>Show Contacts</button>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Contacts Modal"
        style={modalStyles}
      >
        <h2>Contacts</h2>
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <h3>{contact.name}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>icon: {contact.icon}</p>
          </div>
        ))}
        <button style={buttonStyles} onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ContactList;
