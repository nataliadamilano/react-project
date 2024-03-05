import React, { useState, useEffect } from 'react';
import './ListaContactos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Contacto } from '../Contacto/Contacto';

function ListaContactos({ contacts, onDeleteContact }) {

   // Constante que establece la cantidad de contactos que se quieren mostrar en pantalla. Esto sirve para poder armar un slider de contactos.
    // En mi caso, quiero que solo se visualicen 4 contactos a la vez si es que hay más de esa cantidad.
    const contactsPerSlide = 4;

    // useState que maneja la posición en donde nos encontramos dentro del array de contactos. Esto me sirve para ir mostrando de a 4 contactos a la vez. Inicialmente está en 0.
    const [startIndex, setStartIndex] = useState(0);
    // console.log(startIndex);
    // useState que maneja la cantidad de contactos que se están viendo en pantalla. Esto me sirve para controlar cuándo mostrar los botones para ir hacia adelante o hacia atrás en la lista de contactos.
    const [visibleContactsCount, setVisibleContactsCount] = useState(0);

    useEffect(() => {
      // Calcula el número de contactos a mostrar dependiendo de la posición del slider de contactos en la que estemos (startIndex)
      const count = Math.min(contactsPerSlide, contacts.length - startIndex);

      // Se setea la cantidad de contactos a mostrar.
      setVisibleContactsCount(count);
      console.log(startIndex);
      // Como dependencias del useEffect, le paso el índice del slider y los contactos ya que dependiendo en dónde esté posicionada en el slider de contactos, necesito que el hook se ejecute cada vez que estos argumentos cambien su estado.
    }, [startIndex, contacts]);

    // Función que cambia el estado del índice del slider en el que estamos posicionados. En este caso, si se hace clic en el botón para mostrar más contactos, el índice pasa a tener + 4 (pasamos la vista de 4 contactos para poder ver los contactos que siguen).
    const handleShowMoreBtn = () => {
      setStartIndex((prevStartIndex) => prevStartIndex + contactsPerSlide);
      // console.log(startIndex);
    };

    // Función que cambia el estado del índice del slider en el que estamos posicionados. En este caso, si se hace clic en el botón para mostrar menos contactos, el índice pasa a tener - 4 (retrocedemos 4 contactos para ver los contactos anteriores. Se utiliza Math.max(0) por si este botón se muestra en el primer slide, ya que si esto es así, deja el índice en 0 para no romper el slider).
    const handleShowLessBtn = () => {
        setStartIndex((prevStartIndex) => Math.max(0, prevStartIndex - contactsPerSlide));
      };
    // Función que maneja la eliminación de un contacto y le devuelve el ID del contacto a eliminar a App mediante la prop de tipo función que le fue pasado al componente.
    const handleDeleteContact = (contactId) => {

      // Le paso a App desde el prop el valor del ID del contacto a eliminar para que pueda ejecutar el localStorage.
      onDeleteContact(contactId);
      // Además, manejo el cambio del estado del índice del slider para que al eliminar un contacto: si la cantidad de contactos visibles es menor o igual a 1 entonces actualiza el índice del slider para retroceder en la lista de contactos y mostrar siempre 4 contactos.
      setStartIndex((prevStartIndex) => {
        if (visibleContactsCount <= 1) {
          const newStartIndex = Math.max(0, prevStartIndex - contactsPerSlide);
          return newStartIndex;
        }
        // Si hay 1 elemento visible o más, simplemente devuelve el índice actual.
        return prevStartIndex;
      });
    };

    return <>
            <ul>
                {contacts.slice(startIndex, startIndex + contactsPerSlide).map((contact) => (
                <li className="contact" key={contact.id}>
                    <FontAwesomeIcon className='fa-trash' icon={faTrash} onClick={()=> handleDeleteContact(contact.id)} />
                    <Contacto contact={contact} />
                </li>
                ))}
            </ul>
            <div className='btns-list-container'>
              {startIndex > 0 && (
              <FontAwesomeIcon className='fa' icon={faCircleChevronLeft} onClick={handleShowLessBtn} />
              )}
              {startIndex + contactsPerSlide < contacts.length && (
              <FontAwesomeIcon className='fa-circle-chevron-right' icon={faCircleChevronRight} onClick={handleShowMoreBtn} />
              )}
            </div>
          </>;
}
  
export {ListaContactos};