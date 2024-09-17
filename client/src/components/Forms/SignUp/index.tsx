import { FormEvent, useRef, useState } from 'react';
import { createUser } from '../../../api/userAPI';
import Auth from '../../../utils/auth';
import '../Login/login.css';
import { login } from '../../../api/authAPI';

const SignUp = () => {
  const [error, setError] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
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
      await createUser({ username, password, firstName, lastName, email, dob });
      const data = await login({ username, password });
      if (Object.keys(data).includes('token')) Auth.login(data.token);
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
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input ref={usernameRef} type="text" id="username" name="username" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id="password" name="password" />
        </div>
        <div className="form-field">
          <label htmlFor="first-name">First Name</label>
          <input ref={firstNameRef} type="text" id="first-name" name="first-name" />
        </div>
        <div className="form-field">
          <label htmlFor="last-name">Last Name</label>
          <input ref={lastNameRef} type="text" id="last-name" name="last-name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" name="email" />
        </div>
        <div className="form-field">
          <label htmlFor="dob">Date of Birth</label>
          <input ref={dobRef} type="date" id="dob" name="dob" />
        </div>
        <div className="form-action">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
