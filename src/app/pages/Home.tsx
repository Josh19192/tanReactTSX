// src/pages/Home.tsx
import "../styles/Dashboard.css"; // Import the CSS file
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import {  faSyringe,  faPills ,faCalculator,faUsers  } from '@fortawesome/free-solid-svg-icons';
const Home: React.FC = () => {


  const [totalChildren, setTotalChildren] = useState<number>(0);
  const [totalVaccine, setTotalVaccine] = useState<number>(0);
  const [totalInjected, setTotalInjected] = useState<number>(0);
  const [totalInjectedToday, setTotalInjectedToday] = useState<number>(0);
  
  useEffect(() => {
    // Replace this URL with the actual endpoint where you can get the total children count
    axios.get('http://localhost:3001/total-injected-today')
      .then((response) => {
        // Assume the response data contains the total children count
        setTotalInjectedToday(response.data.totalInjectedToday);
      })
      .catch((error) => {
        console.error('Error fetching total children:', error);
      });
  }, []);
  
  // Fetch total children count when component mounts
  useEffect(() => {
    // Replace this URL with the actual endpoint where you can get the total children count
    axios.get('http://localhost:3001/total-children')
      .then((response) => {
        // Assume the response data contains the total children count
        setTotalChildren(response.data.totalChildren);
      })
      .catch((error) => {
        console.error('Error fetching total children:', error);
      });
  }, []);
  useEffect(() => {
    // Replace this URL with the actual endpoint where you can get the total children count
    axios.get('http://localhost:3001/total-vaccine')
      .then((response) => {
        // Assume the response data contains the total children count
        setTotalVaccine(response.data.totalVaccine);
      })
      .catch((error) => {
        console.error('Error fetching total children:', error);
      });
  }, []);
  useEffect(() => {
    // Replace this URL with the actual endpoint where you can get the total children count
    axios.get('http://localhost:3001/total-injected')
      .then((response) => {
        // Assume the response data contains the total children count
        setTotalInjected(response.data.totalInjected);
      })
      .catch((error) => {
        console.error('Error fetching total children:', error);
      });
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
        DASHBOARD
      </h2>
      <div className="container-xxl1 flex-grow-1 container-p-y" style={{ marginLeft: "5%" }}>


        {/* First Row */}
        <div className="row1">
          {/* Children Registered */}
          <div className="col-lg-5 col-md-5 col-sm-6 mb-2">
            <div className="card1">
              <button>
                
                <div className="card-body1 children" style={{ position: 'relative' }}>
                  <a>
                    <div className="card-title1" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      {/* Syringe Icon at the top-left */}
                      <FontAwesomeIcon icon={faUsers} style={{ color: 'white', fontSize: '50px', marginTop: '10px', marginLeft: '10px' }} />
                    </div>
                    <span>Children Registered</span>
                    <h2 style={{  marginTop: '20px'}}>{ totalChildren }</h2>
                  </a>
                </div>
              </button>
            </div>
          </div>

          {/* Vaccines */}
          <div className="col-lg-5 col-md-5 col-sm-6 mb-2">
            <div className="card1">
              <button>
                <div className="card-body1 vaccines" style={{ position: 'relative' }}>
                  <a>
                    <div className="card-title1" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      {/* Syringe Icon at the top-left */}
                      <FontAwesomeIcon icon={faPills} style={{ color: 'white', fontSize: '50px', marginTop: '10px', marginLeft: '10px' }} />
                    </div>
                    <span>Vaccines</span>
                    <h2 style={{ marginTop: '20px'}}>{totalVaccine }</h2>
                  </a>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="row1">
          {/* Injected Today */}
          <div className="col-lg-5 col-md-5 col-sm-6 mb-2">
            <div className="card1">
              <button>
                
                <div className="card-body1 injected-today" style={{ position: 'relative' }}>
                  <a>
                    <div className="card-title1" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      {/* Syringe Icon at the top-left */}
                      <FontAwesomeIcon icon={faSyringe} style={{ color: 'white', fontSize: '50px', marginTop: '10px', marginLeft: '10px' }} />
                    </div>
                    <span>Injected Today</span>
                    <h2 style={{  marginTop: '20px'}}>{ totalInjectedToday}</h2>
                  </a>
                </div>
              </button>
            </div>
          </div>

          {/* Total Injected */}
          <div className="col-lg-5 col-md-5 col-sm-6 mb-2">
            <div className="card1">
              <button>
                
                <div className="card-body1 total-injected" style={{ position: 'relative' }}>
                  <a>
                    <div className="card-title1" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      {/* Syringe Icon at the top-left */}
                      <FontAwesomeIcon icon={faCalculator} style={{ color: 'white', fontSize: '50px', marginTop: '10px', marginLeft: '10px' }} />
                    </div>
                    <span>Total Injected</span>
                    <h2 style={{  marginTop: '20px'}}>{ totalInjected}</h2>
                  </a>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
