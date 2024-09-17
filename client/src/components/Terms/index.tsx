import Markdown from 'react-markdown';
import rawTerms from '/terms.txt';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './terms.css';

export default function Terms({ toggleTerms }: { toggleTerms: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [terms, setTerms] = useState('');

  useEffect(() => {
    async function readFile() {
      try {
        const response = await fetch(rawTerms);
        const text = await response.text();

        setTerms(text);
      } catch (error) {
        console.error(error);
      }
    }

    readFile();
  }, []);

  return (
    <motion.div className="terms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} exit={{ opacity: 0 }}>
      <Markdown>{terms}</Markdown>
      <button onClick={() => toggleTerms(false)}>Close</button>
    </motion.div>
  );
}
