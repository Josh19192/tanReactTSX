// src/components/Sidebar.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus, faSyringe, faCogs, faSignOutAlt, faPills, faFile } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user authentication data (e.g., token, session data)
    localStorage.removeItem('authToken'); // Assuming you're storing the token in localStorage
    sessionStorage.removeItem('authToken'); // If you're using sessionStorage

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <img src="/assets/img/inj.png" alt="Admin Dashboard" className="sidebar-image" style={{ marginLeft: '40px' }} />
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
            Home
          </Link>
        </li>
        <li>
          <Link to="/addchild">
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} />
            Add Child
          </Link>
        </li>
        <li>
          <Link to="/managechildren">
            <FontAwesomeIcon icon={faCogs} style={{ marginRight: '10px' }} />
            Manage Children
          </Link>
        </li>
        <li>
          <Link to="/addvac">
            <FontAwesomeIcon icon={faPills} style={{ marginRight: '10px' }} />
            Add Vaccine
          </Link>
        </li>
        <li>
          <Link to="/managevac">
            <FontAwesomeIcon icon={faSyringe} style={{ marginRight: '10px' }} />
            Manage Vaccine
          </Link>
        </li>
        <li>
          <Link to="/shotrecords">
            <FontAwesomeIcon icon={faFile} style={{ marginRight: '10px' }} />
            Shot Records
          </Link>
        </li>
        <li>
          <Link to="/account">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
            Account
          </Link>
        </li>
        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
