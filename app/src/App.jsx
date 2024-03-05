import React, { useState, useEffect } from 'react';
import "./App.css";
import { AgregarContacto } from "./components/AgregarContacto/AgregarContacto";
import { ListaContactos } from "./components/ListaContactos/ListaContactos";
import { FiltroContactos } from './components/FiltroContactos/FiltroContactos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

function App() {

  // useState para manejar el estado del array de contactos.
  const [contacts, setContacts] = useState([]);

  // useState para manejar el estado de un booleano que tiene como objetivo mostrar o no el componente AgregarContacto o no. Sirve además para mostrar el formulario si es que no existen contactos y se quiere agregar uno por primera vez desde el botón que renderiza App.
  const [showAgregarContacto, setShowAgregarContacto] = useState(false);

  // useState para manejar el estado de un booleano que tiene como función mostrar o no el componente ListaContacto
  const [showListaContacto, setShowListaContacto] = useState(true);

  // useEffect que al ejecutarse trata de obtener el array de contactos desde el localStorage, y si existe, actualiza el array de contactos actual con los datos cacheados.
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  // Función para agregar un nuevo contacto. Es un prop que se pasa a AgregarContacto para obtener el objeto contacto a agregar. Obtiene el contacto nuevo y lo agrega al array de contactos previo. Además, actualiza el localStorage con la nueva data.
  const addContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  // Función para eliminar un contacto a partir de su ID. Es una función prop que se le pasa a FiltroContactos y a ListaContactos para poder obtener el ID a eliminar y que App pueda actualizar el array de contactos actual como así también actualizar el localStorage.
  const deleteContact = (contactId) => {
    //utilizar un metodo filter para crear un nuevo array que excluye la tarea
    const contactDelete = contacts.filter(contact => contact.id !== contactId);

    //Actualizar el estado de tasks con el nuevo array que excluye las tareas eliminadas
    setContacts(contactDelete);
    localStorage.setItem('contacts', JSON.stringify(contactDelete));

  }

  return (
    <>
    <div className="container">
      <div className='bar-container'>
        <h1 className='title'> <FontAwesomeIcon className='fa-address-book' icon={faAddressBook} /> MI AGENDA PERSONAL</h1>
        <div className='add-search-container'>
          <AgregarContacto onAddContact={addContact} showAgregarContacto={showAgregarContacto} setShowAgregarContacto={setShowAgregarContacto}/>
          <FiltroContactos contacts={contacts} setShowListaContacto={setShowListaContacto} onDeleteContact={deleteContact}/>
        </div>
      </div>
      {contacts.length === 0 ? (
        <div className='add-first-contact-container'>
          <p>Usted aún no tiene contactos agregados.</p>
          <button onClick={() => setShowAgregarContacto(true)} className='submit-btn'>Agregar</button>
        </div>
      ) : (showListaContacto ? (
        <ListaContactos contacts={contacts} onDeleteContact={deleteContact}/>
      ) : null)}
    </div>
    </>
  );
}

export default App;
