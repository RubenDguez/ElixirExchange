import { useEffect, useState } from 'react';
import rawContact from '/contact.md?url';
import Markdown from 'react-markdown';
import './contacts.css'
import Footer from '../../components/Footer';

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


