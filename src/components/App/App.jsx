import { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container, AppTitle, ContactsTitle } from './App.styled';
import { FcContacts } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LS_KEY = 'saved_contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(window.localStorage.getItem(LS_KEY));

    if (!savedContacts) {
      return [];
    }

    return savedContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = newContact => {
    const normalizedNewContactsName = newContact.name.toLowerCase();
    const existingСontact = contacts.find(
      ({ name }) => name.toLowerCase() === normalizedNewContactsName
    );

    if (existingСontact) {
      return toast.warn(`${newContact.name} is already in contacts`);
    }

    setContacts([newContact, ...contacts]);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const handleFilterChange = e => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  return (
    <Container>
      <AppTitle>
        Phonebook <FcContacts size={30} />
      </AppTitle>
      <ContactForm onSubmit={formSubmitHandler} />
      <ContactsTitle>Contacts</ContactsTitle>

      <Filter value={filter} onChange={handleFilterChange} />

      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />

      <ToastContainer position="top-center" />
    </Container>
  );
};
