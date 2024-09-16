import { FormEvent, useRef, useState } from 'react';
import { login } from '../../api/authAPI';
import Auth from '../../utils/auth';
import './login.css';

const Login = () => {
  const [error, setError] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      const data = await login({ username, password });

      if (Object.keys(data).includes('token')) Auth.login(data.token);
      else throw new Error('Failed to login');
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
        <h1>Login</h1>
        {error !== '' && <h4 className="form-error-message">{error}</h4>}
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input ref={usernameRef} type="text" id="username" name="username" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id="password" name="password" />
        </div>
        <div className="form-action">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
