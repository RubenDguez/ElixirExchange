import { motion } from 'framer-motion';
import { FormEvent, useRef, useState } from 'react';
import { login } from '../../../api/authAPI';
import { createUser } from '../../../api/userAPI';
import useAuthenticate from '../../../hooks/authenticate';
import '../Login/login.css';

const SignUp = ({ toggleTerms }: { toggleTerms: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const authenticate = useAuthenticate();
  const [error, setError] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const tocRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const firstName = firstNameRef.current?.value || '';
    const lastName = lastNameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const dob = dobRef.current?.value || '';

    try {
      if (username === '' || password === '' || firstName === '' || lastName === '' || email === '' || dob === '') throw new Error('Please fill in all fields');
      const newUser = await createUser({ username, password, firstName, lastName, email, dob });

      if (newUser === null) throw new Error(`Invalid user data, do you have an account with us?`);

      const data = await login({ username, password });
      if (Object.keys(data).includes('token')) authenticate.login(data.token);
      else throw new Error('invalid user data');
    } catch (err) {
      const ERROR = err as Error;
      setError(ERROR.message);
    } finally {
      formRef.current?.reset();
      usernameRef.current?.focus();
    }
  };

  return (
    <div className="form-container">
      <form ref={formRef} className="form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {error !== '' && <h4 className="form-error-message">{error}</h4>}
        <motion.div className="form-field" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} exit={{ opacity: 0 }}>
          <label htmlFor="username">Username</label>
          <input ref={usernameRef} type="text" id="username" name="username" required />
        </motion.div>
        <motion.div className="form-field" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} exit={{ opacity: 0 }}>
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id="password" name="password" required />
        </motion.div>
        <motion.div className="form-field" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} exit={{ opacity: 0 }}>
          <label htmlFor="first-name">First Name</label>
          <input ref={firstNameRef} type="text" id="first-name" name="first-name" required />
        </motion.div>
        <motion.div className="form-field" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} exit={{ opacity: 0 }}>
          <label htmlFor="last-name">Last Name</label>
          <input ref={lastNameRef} type="text" id="last-name" name="last-name" required />
        </motion.div>
        <motion.div className="form-field" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} exit={{ opacity: 0 }}>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" name="email" required />
        </motion.div>
        <motion.div className="form-field" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} exit={{ opacity: 0 }}>
          <label htmlFor="dob">Date of Birth</label>
          <input ref={dobRef} type="date" id="dob" name="dob" style={{ fontFamily: 'Roboto' }} required />
        </motion.div>
        <motion.div className="form-toc" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} exit={{ opacity: 0 }}>
          <label htmlFor="toc">
            Must accept and acknowledge our <strong onClick={() => toggleTerms(true)}>terms and conditions</strong>
          </label>
          <input ref={tocRef} type="checkbox" id="toc" name="toc" required />
        </motion.div>
        <motion.div className="form-action" initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1 }} exit={{ opacity: 0 }}>
          <button type="submit">Submit</button>
        </motion.div>
      </form>
    </div>
  );
};

export default SignUp;
