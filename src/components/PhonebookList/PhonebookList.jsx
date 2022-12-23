import PropTypes from 'prop-types';
import style from './PhonebookList.module.css';
import { getFilterValue } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { useContactsQuery, useDeleteContactMutation } from 'redux/contacts';

export const PhonebookList = () => {
  const { data } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filterValue = useSelector(getFilterValue);
    console.log(data)

  if (!data) {
    return <div>No contacts</div>;
  }

  const filteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return (
      data &&
      data.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  };

  const contactsFilter = filteredContacts();

  return (
    
      <ul className={style.contactsList}>
        {contactsFilter.map(({ id, name, phone, image }) => (
          <li key={id} className={style.contactsItem}>
            <img className={ style.contactImage}src={image} alt='avatar' width="80" height="80" /> 
            <div className={style.wrapper}>
              <span className={style.contactsName}>{`${name}`}</span><span className={style.contactsPhone}>{`${phone}`}</span>
              
            <button
              type="button"
              className={style.contactBtn}
              onClick={() => deleteContact(id)}
            >
              Delete
              </button>
              </div>
          </li>
        ))}
      </ul>
    
  );
};

PhonebookList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};