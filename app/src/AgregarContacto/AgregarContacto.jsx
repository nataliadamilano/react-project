import React, { useState } from 'react';
import './AgregarContacto.css'
import DefaultContactPhoto from '../assets/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

function AgregarContacto({ onAddContact, showAgregarContacto, setShowAgregarContacto }) {

    // useState que me permite cargar una foto para un contacto al momento de agregarlo. El estado de inicio es una imagen por defecto en caso de que no se le agregue otra imagen.
    const [contactPhoto, setContactPhoto] = useState(DefaultContactPhoto);

    // Función que permite cargar una foto desde una PC hacia la app mediante el input file del formulario de AgregarContacto. Lo que hace es leer el archivo (la imagen) y cambia el estado de contactPhoto con el valor del archivo seleccionado.
    const handleSetContactPhoto = (event) => {
        const file = event.target.files[0];
    
        if (file) {

          const reader = new FileReader();
    
          reader.onload = (e) => {
            setContactPhoto(e.target.result);
          };
    
          reader.readAsDataURL(file);
        }

      };
      
      // useState para manejar el estado del input del nombre del contacto. Esto permite cargar currentInputName con el valor que tipea el usuario como así también reiniciar su estado al momento de haber cargado el formulario por completo.
      const [currentInputName, setCurrentInputName] = useState('');

      // Función que obtiene el valor tipeado por el usuario en el input.
      const inputNameChange = (event) => {
        setCurrentInputName(event.target.value)
      };

      // useState para manejar el estado del input del apellido del contacto. Esto permite cargar currentInputSurname con el valor que tipea el usuario como así también reiniciar su estado al momento de haber cargado el formulario por completo.
      const [currentInputSurname, setCurrentInputSurname] = useState('');

      // Función que obtiene el valor tipeado por el usuario en el input.
      const inputSurnameChange = (event) => {
        setCurrentInputSurname(event.target.value)
      };

      // useState para manejar el estado del input del teléfono del contacto. Esto permite cargar currentInputPhoneNumber con el valor que tipea el usuario como así también reiniciar su estado al momento de haber cargado el formulario por completo.
      const [currentInputPhoneNumber, setCurrentInputPhoneNumber] = useState('');

      // Función que obtiene el valor tipeado por el usuario en el input.
      const inputPhoneNumberChange = (event) => {
        setCurrentInputPhoneNumber(event.target.value)
      };

      // useState para manejar el estado del input del e-mail del contacto. Esto permite cargar currentInputEmail con el valor que tipea el usuario como así también reiniciar su estado al momento de haber cargado el formulario por completo.
      const [currentInputEmail, setCurrentInputEmail] = useState('');

      // Función que obtiene el valor tipeado por el usuario en el input.
      const inputEmailChange = (event) => {
        setCurrentInputEmail(event.target.value)
      };
      
      // useState para manejar el estado del input del domicilio del contacto. Esto permite cargar currentInputAddress con el valor que tipea el usuario como así también reiniciar su estado al momento de haber cargado el formulario por completo.
      const [currentInputAddress, setCurrentInputAddress] = useState('');

      // Función que obtiene el valor tipeado por el usuario en el input.
      const inputAddressChange = (event) => {
        setCurrentInputAddress(event.target.value)
      };

      // Función para agregar un contacto nuevo. Como utilizo un <form>, tuve que deshabilitar el evento del form por defecto para que no recargara la página.
      const addContact = (event) => {
        event.preventDefault();
        // Se corrobora de que los campos del formulario no estén vacíos (salvo la foto de contacto ya que si no agrega una el usuario, queda una imagen por defecto).
        if (currentInputName.trim() !== '' && currentInputSurname.trim() !== '' && currentInputPhoneNumber.trim() !== '' && currentInputEmail.trim() !== '' && currentInputAddress.trim() !== '') {
          // Si los campos contienen valores, entonces creo un nuevo objeto para el contacto a agregar, asignándole los valores que el usuario tipeó.
          const newContact = {
            id: Date.now(), // Se le genera un ID para poder identificar al contacto al momento de querer hacer otras operaciones, como eliminar el contacto, por ejemplo.
            img: contactPhoto,
            name: currentInputName,
            surname: currentInputSurname,
            phoneNumber: currentInputPhoneNumber,
            email: currentInputEmail,
            address: currentInputAddress
          };

          // Se le pasa a la función prop proveniente de App el objeto contacto cargado para que lo sume al array de contactos actual (o sea, que actualice la lista de contactos). Además, App actualiza el localStorage con esta información.
          onAddContact(newContact);
    
          // Esta función es llamada para que cuando se termine de cargar un contacto nuevo, se vuelvan a habilitar los efectos hover de las cards de contactos.
          enableContactHoverEvent();

          // Actualiza el estado de showAgregarContacto para que no se muestre el formulario al momento de terminar de cargar un contacto nuevo.
          setShowAgregarContacto(false);

          // Se reestablecen los valores de los inputs y de la imagen a cargar para que cuando se cargue un nuevo contacto, no quede el historial del contacto anterior como valores de carga.
          setContactPhoto(DefaultContactPhoto); 
          setCurrentInputName('');
          setCurrentInputSurname('');
          setCurrentInputPhoneNumber('');
          setCurrentInputEmail('');
          setCurrentInputAddress('');
        }
      };
      
      // Función que habilita el evento hover de las cards de contacto.
      const enableContactHoverEvent = () => {
        const contacts = document.querySelectorAll('.contact');
        contacts.forEach(contact => {
          contact.style.pointerEvents = "auto";
        });
      }

      // Función que deshabilita el evento hover de las cards de contacto.
      const disableContactHoverEvent = () => {
        const contacts = document.querySelectorAll('.contact');
        contacts.forEach(contact => {
          contact.style.pointerEvents = "none";
        });
      }

      // Función que oculta el formulario cuando se hace click en el botón de cierre 'X'.
      // Además, vuelve a habilitar el efecto hover de las cards de contactos ya agregadas.
      const closeForm = () => {
        enableContactHoverEvent();
        setShowAgregarContacto(false);
      };

      // Función que muestra el formulario cuando se hace click en el icono de agregar contacto que se encuentra al lado del filtro de búsqueda.
      // Además, deshabilita el efecto hover de las cards de contactos ya agregadas ya que el formulario vuelve a aparecer.
      const openForm = () => {
        disableContactHoverEvent();
        setShowAgregarContacto(true);
      };

    return showAgregarContacto ? ( <form className="add-contact-form">
                <span className="close-btn" role="img" aria-label="cruz" onClick={closeForm}>
                  &#x2716;
                </span>
                <div className='contact-image-container'>
                    <img src={contactPhoto} alt="default-img" />
                </div>
                <label htmlFor="input-img" className='contact-image-btn'>Cargar foto</label>
                <input type="file" className='contact-image-input' accept='image/jpeg, image/jpg, image/png' id='input-img' onChange={handleSetContactPhoto}/>
                <label htmlFor="name">Nombre</label>
                <input type="text" value={currentInputName} id='name' onChange={inputNameChange} />
                <label htmlFor="surname">Apellido</label>
                <input type="text" value={currentInputSurname} id='surname' onChange={inputSurnameChange} />
                <label htmlFor="phone-number">Teléfono</label>
                <input type="tel" value={currentInputPhoneNumber} id='phone-number' onChange={inputPhoneNumberChange} />
                <label htmlFor="e-mail">Correo electrónico</label>
                <input type="email" value={currentInputEmail} id='e-mail' onChange={inputEmailChange} />
                <label htmlFor="address">Dirección</label>
                <input type="text" value={currentInputAddress} id='address' onChange={inputAddressChange}/>
                <button onClick={addContact} className='submit-btn'>Agregar</button>
            </form>
            ) : <FontAwesomeIcon className='fa-user-plus' icon={faUserPlus} onClick={openForm} />;
  }
  
  export { AgregarContacto };