import { useSelector, useDispatch } from 'react-redux';
import { FcContacts } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container, AppTitle, ContactsTitle } from './App.styled';
import { add, remove, changeFilter } from 'redux/contactsActions';

export const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const formSubmitHandler = newContact => {
    const normalizedNewContactsName = newContact.name.toLowerCase();
    const existingСontact = contacts.find(
      ({ name }) => name.toLowerCase() === normalizedNewContactsName
    );

    if (existingСontact) {
      return toast.warn(`${newContact.name} is already in contacts`);
    }

    dispatch(add(newContact));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    dispatch(remove(contactId));
  };

  const handleFilterChange = e => {
    const newFilter = e.target.value;
    dispatch(changeFilter(newFilter));
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
