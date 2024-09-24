import { useEffect, useState } from 'react';
import rawContact from '/contact.md?url';
import Markdown from 'react-markdown';
<<<<<<< HEAD
import './contacts.css';
=======
import './contacts.css'
>>>>>>> b7b40a7abecf05113c79335cd8a317c75f71ab10

export default function Contact() {
  const [contact, setContact] = useState('')
  useEffect(() => {
    async function readFile() {
      try {
        const response = await fetch(rawContact);
        const text = await response.text();

        setContact(text);
      } catch (error) {
        console.error(error);
      }
    }

    readFile();
  }, []);   
  return (
        <div className='contact'>         
          <Markdown>{contact}</Markdown>
        </div>
    )
}


