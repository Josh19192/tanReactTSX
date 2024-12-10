import React, { useState } from 'react';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon you want to use



interface LoginFormProps {
  onLogin: (isLoggedIn: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous error messages

    // Hash the password with the same salt as the backend
    const hashedPassword =
      "BhsXkflnsm" + CryptoJS.MD5(password).toString(CryptoJS.enc.Hex) + "ls0a1L2";

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: email,
        password: hashedPassword,
      });

      // Store the token in localStorage if login is successful
      localStorage.setItem('authToken', response.data.token);
      alert('Successful login!');
      onLogin(true); // Call the onLogin function to update the login state
    } catch (error) {
      console.error("Error during login:", error);
      setError('Invalid username or password! Please try again!');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>ADMIN LOGIN</h2>
        <br />
        <form style={styles.form} onSubmit={handleSubmit}>
         <FontAwesomeIcon icon={faUserMd} style={{ color: '#2c3e50', fontSize: '80px', marginTop: '10px', marginLeft: '10px' }} />
         <br /><br />
          <label style={styles.label} htmlFor="text">Username:</label>
          <input
            style={styles.input}
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <label style={styles.label} htmlFor="password">Password:</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <br />
          {error && <p style={styles.error}>{error}</p>} {/* Display error message */}
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '350px',
  },
  title: {
    textAlign: 'center',
    color: '#0044cc',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    color: '#0044cc',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#0044cc',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default LoginForm;
