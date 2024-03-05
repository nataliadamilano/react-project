import './Contacto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faHouse } from '@fortawesome/free-solid-svg-icons';

function Contacto({ contact }) {
    return <>
            <div className='contact-photo-container'>
                <img src={contact.img} alt={`${contact.name} ${contact.surname}`} />
            </div>
            <div className='contact-info-container'>
                <p className='contact-name'>{contact.name} {contact.surname}</p>
                <hr />
                <p><FontAwesomeIcon className='fa-phone' icon={faPhone} /> {contact.phoneNumber}</p>
                <p><FontAwesomeIcon className='fa-envelope' icon={faEnvelope} /> {contact.email}</p>
                <p><FontAwesomeIcon className='fa-house' icon={faHouse} /> {contact.address}</p>
            </div>
    </>;
}

export {Contacto};