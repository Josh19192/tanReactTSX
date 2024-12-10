import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import eye icons

const Account: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPass: '',
  });

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for hover effect
  const [isHovered, setIsHovered] = useState(false);

  // State for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form data change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPass) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3001/createUser', {
        username: formData.username,
        password: formData.password,
        repassword: formData.confirmPass,
      });

      alert("User created successfully!");
      // Clear form data on success
      setFormData({ username: '', password: '', confirmPass: '' });
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>ADD ACCOUNT</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <div className="form-column">
            <label>
              Username:
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </label>

            <label>
              Password:
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </label>
          </div>

          <div className="form-column">
            <label>
              Confirm Password:
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPass"
                  name="confirmPass"
                  value={formData.confirmPass}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </label>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: isHovered ? 'rgb(50, 130, 60)' : 'rgb(65, 160, 86)', // Green on hover
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              width: '30%',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)} // When mouse enters
            onMouseLeave={() => setIsHovered(false)} // When mouse leaves
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Creating...' : 'Save Account'}
          </button>
        </div>
      </form>

      {/* Display success or error messages */}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Account;
