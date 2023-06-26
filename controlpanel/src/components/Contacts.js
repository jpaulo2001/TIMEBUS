import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ContactList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isBtnHover, setBtnHover] = useState(false);
  // const [contacts, setContacts] = useState([]);
  const contacts = []
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  useEffect(() => {
    addContact();
  }, []);

  const addContact = () => {
    const newContact = {
      name: contactName,
      email: contactEmail,
      phone: contactPhone
    };

    const token = localStorage.getItem('jwt');
    fetch('http://localhost:4000/api/contacts', {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newContact)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addContact();
      })
      .catch((err) => console.log(err));
  }

  const removeSelection = (contactName) => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:4000/api/contacts/${contactName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addContact();
      })
      .catch((err) => console.log(err));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const btnMouseEnter = () => {
    setBtnHover(true);
  }

  const btnMouseLeave = () => {
    setBtnHover(false);
  }

  return (
    <div style={{ ...styles.center, ...styles.linearGradient }}>
      <h1>Contact List</h1>

      <button style={isBtnHover ? styles.buttonStyles : styles.buttonStylesHover} onClick={openModal}
        onMouseEnter={btnMouseEnter}
        onMouseLeave={btnMouseLeave}
      >Show Contacts</button>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Contacts Modal"
        style={modalStyles}
      >
        <h2>Contacts</h2>
        <div>
        <input type="text" placeholder="Name" onChange={(e) => setContactName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setContactEmail(e.target.value)} />
        <input type="text" placeholder="Phone" onChange={(e) => setContactPhone(e.target.value)} />
        <button onClick={addContact}>Add Contact</button>
      </div>
      
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <h3>{contact.name}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <button onClick={() => removeSelection(contact.name)}>Remove</button>
          </div>
        ))}
        <button style={styles.buttonStyles} onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
export default ContactList;


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

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '3px solid red',
  },
  buttonStyles: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
  },
  linearGradient: {
    background: "linear-gradient(to top, blue, white)",
  },
  buttonStylesHover: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: '#007bff',
  },
};

