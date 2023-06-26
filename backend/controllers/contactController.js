const Contact = require('../models/contactModel');


const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({ error: 'Failed to find Contacts' });
    }
};

const createContact = async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Contact' });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ name: req.params.contactName });
        if (!contact) res.status(404).json({ error: 'Contact not found' });
        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Contact' });
    }
};


module.exports = {
    getContacts,
    createContact,
    deleteContact,
}