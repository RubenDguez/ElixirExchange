import { useEffect, useState } from 'react';
import rawAbout from '/about.md?url';
import Markdown from 'react-markdown';
import './about.css';

export default function About() {
    const [about, setAbout] = useState('');
    useEffect(() => {
        async function readFile() {
          try {
            const response = await fetch(rawAbout);
            const text = await response.text();
    
            setAbout(text);
          } catch (error) {
            console.error(error);
          }
        }
    
        readFile();
      }, []);
    return (
        <div className='about'>
            <Markdown>{about}</Markdown>
        </div>
    )
}
