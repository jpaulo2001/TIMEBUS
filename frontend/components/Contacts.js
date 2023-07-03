  import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';

const Popup = () => {
  const [open, setOpen] = useState(false);

  const contacts = [
    { name: 'Contact 1', phone: '123-456-7890' },
    { name: 'Contact 2', phone: '987-654-3210' },
    { name: 'Contact 3', phone: '555-555-5555' },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCall = (phone) => {
    // Implement your call functionality here
    console.log(`Calling ${phone}`);
  };

  return (
    <div>
      <h1>ola</h1>
      <button onClick={handleOpen}>Open Popup</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contacts</DialogTitle>
        <DialogContent>
          <List>
            {contacts.map((contact, index) => (
              <ListItem button key={index} onClick={() => handleCall(contact.phone)}>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={contact.name} secondary={contact.phone} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Popup;
