import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/ManageChildren.css'; // Import the CSS file

interface Child {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  sex: string;
  birthdate: string;
  address: string;
  place_of_birth: string;
  birth_method: string;
  child_blood_type: string;
  number: string;
  mother_fname: string;
  mother_mname: string;
  mother_lname: string;
  mother_blood_type: string;
  mother_citizenship: string;
  mother_occupation: string;
  father_fname: string;
  father_mname: string;
  father_lname: string;
  father_blood_type: string;
  father_citizenship: string;
  father_occupation: string;
}

const ManageChildren: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const [isInjectModalOpen, setIsInjectModalOpen] = useState(false); // Controls modal visibility
  const [currentChild, setCurrentChild] = useState<Child | null>(null);
  const [vaccineList, setVaccineList] = useState<string[]>([]); // Vaccine list state
  const [selectedVaccine, setSelectedVaccine] = useState<string>(''); // Selected vaccine
  const [doseList, setDoseList] = useState<number[]>([]); // Dose options for the selected vaccine
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const filteredChildren = children.filter((child) => {
    const fullName = `${child.first_name} ${child.middle_name} ${child.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleInjectSave = () => {
    if (currentChild && selectedVaccine && doseList.length > 0) {
      const shotDate = new Date().toISOString();

      // Log the selected values to ensure they are set
      console.log('currentChild:', currentChild);
      console.log('selectedVaccine:', selectedVaccine);
      console.log('doseList:', doseList);

      axios
        .get(`http://localhost:3001/vaccine_id/${selectedVaccine}`)
        .then((response) => {
          console.log('Vaccine ID response:', response.data);
          const vaccineId = response.data.vaccine_id;

          // Prepare shot data
          const shotData = {
            child_id: currentChild.id,
            vaccine_id: vaccineId,
            dose_no: doseList[0], 
            shot_date: shotDate,
          };

          // Save the shot record
          axios
            .post('http://localhost:3001/inject', shotData)
            .then((response) => {
               closeInjectModal();
              alert('Shot record saved successfully!');
              
            })
            .catch((error) => {
              console.error('Error saving shot record:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching vaccine ID:', error);
        });
    } else {
      alert('Please complete all fields before saving.');
    }
  };
  const handleDoseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDose = parseInt(e.target.value);
    setDoseList([selectedDose]); // Update the selected dose in the state
  };
  useEffect(() => {
    if (selectedVaccine) {
      axios
        .get(`http://localhost:3001/doses/${selectedVaccine}`)
        .then((response) => {
          const maxDose = response.data.doses[0]; // Assuming the first value is the dose count
          setDoseList(Array.from({ length: maxDose }, (_, i) => i + 1)); // [1, 2, 3]
        })
        .catch((error) => {
          console.error('Error fetching dose data:', error);
        });
    } else {
      setDoseList([]); // Reset doseList when no vaccine is selected
    }
  }, [selectedVaccine]);

  // Handle vaccine selection change
  const handleVaccineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVaccine(event.target.value); // Update the selected vaccine
  };
  // Fetch vaccine list from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3001/vaccine') // Replace with your endpoint for vaccine_tbl
      .then((response) => {
        setVaccineList(response.data.map((vaccine: {vaccine_name: string }) => vaccine.vaccine_name));
      })
      .catch((error) => {
        console.error('Error fetching vaccine data:', error);
      });
  }, []);

  // Fetch the children data from the backend when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/children')
      .then((response) => {
        setChildren(response.data);
      })
      .catch((error) => {
        console.error('Error fetching children data:', error);
      });
  }, []);



  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete child with ID: ${id}?`);
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/children/${id}`)
        .then(() => {
          setChildren((prev) => prev.filter((child) => child.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting child:', error);
        });
    }
  };
  const openInjectModal = (child: Child) => {
    setCurrentChild(child);
    setIsInjectModalOpen(true);
  };

  const closeInjectModal = () => {
    setIsInjectModalOpen(false);
    setCurrentChild(null);
  };

  const openModal = (child: Child) => {
    setCurrentChild(child);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentChild(null);
  };

  const handleSave = () => {
    if (currentChild) {
      axios
        .put(`http://localhost:3001/child/${currentChild.id}`, currentChild)
        .then(() => {
          setChildren((prev) =>
            prev.map((child) =>
              child.id === currentChild.id ? { ...child, ...currentChild } : child
            )
          );
          closeModal(); // Close the modal after saving
          alert("Child Info updated successfully!"); // Success message
        })
        .catch((error) => {
          console.error('Error updating child:', error);
        });
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (currentChild) {
      const { name, value } = e.target;
      setCurrentChild({
        ...currentChild,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };
  const handleInjectFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInjectSave();
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>MANAGE CHILDREN</h2>

      {/* Search Bar */}
      <div style={{marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Child"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "14px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <table className="children-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Sex</th>
            <th>Birthdate</th>
            <th>Address</th>
            <th>Place of Birth</th>
            <th>Birth Method</th>
            <th>Blood Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredChildren.map((child) => (
            <tr key={child.id}>
              <td>{child.id}</td>
              <td>{child.first_name}</td>
              <td>{child.middle_name}</td>
              <td>{child.last_name}</td>
              <td>{child.sex}</td>
              <td>{new Date(child.birthdate).toLocaleDateString('en-CA')}</td>
              <td>{child.address}</td>
              <td>{child.place_of_birth}</td>
              <td>{child.birth_method}</td>
              <td>{child.child_blood_type}</td>
              <td>
                <button onClick={() => openInjectModal(child)} className="inject-button">
                  <i className="fa fa-syringe" aria-hidden="true"></i> {/* Inject icon */}
                </button>
                <button onClick={() => openModal(child)} className="edit-button">
                  <i className="fa fa-pencil" aria-hidden="true"></i> {/* Edit icon */}
                </button>
                <button onClick={() => handleDelete(child.id)} className="delete-button">
                  <i className="fa fa-trash" aria-hidden="true"></i> {/* Delete icon */}
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (

        <div className="modal-overlay">
          <div className="modal-content1">
            <div className="scrollable-container">
              <h2>Edit Child Info</h2>
              <form onSubmit={handleFormSubmit}
                className="form-container">
                {/* Child Information */}
                <div className="form-section">
                  <div className="form-column">
                    <label>
                      First Name:
                      <input
                        type="text"
                        name="first_name"
                        value={currentChild?.first_name || ""}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Middle Name:
                      <input
                        type="text"
                        name="middle_name"
                        value={currentChild?.middle_name || ""}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Last Name:
                      <input
                        type="text"
                        name="last_name"
                        value={currentChild?.last_name || ""}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Sex:
                      <select
                        name="sex"
                        value={currentChild?.sex || ""}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </label>
                    <br />
                    <label>
                      Birthdate:
                      <input
                        type="date"
                        name="birthdate"
                        value={currentChild?.birthdate || ""}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  <div className="form-column">
                    <label>
                      Contact Number:
                      <input
                        type="text"
                        name="number"
                        value={currentChild?.number || ""}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Address:
                      <input
                        type="text"
                        name="address"
                        value={currentChild?.address || ""}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Place of Birth:
                      <input
                        type="text"
                        name="place_of_birth"
                        value={currentChild?.place_of_birth || ""}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Birth Method:
                      <input
                        type="text"
                        name="birth_method"
                        value={currentChild?.birth_method || ""}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Blood Type:
                      <select
                        name="child_blood_type"
                        value={currentChild?.child_blood_type || ""}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </label>
                  </div>
                </div>

                {/* Mother's Information */}
                <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
                  Mother's Info
                </h2>
                <div className="form-section">
                  <div className="form-column">
                    <label>
                      First Name:
                      <input
                        type="text"
                        name="mother_fname"
                        value={currentChild?.mother_fname || ""}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Middle Name:
                      <input
                        type="text"
                        name="mother_mname"
                        value={currentChild?.mother_mname || ""}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Last Name:
                      <input
                        type="text"
                        name="mother_lname"
                        value={currentChild?.mother_lname || ""}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      Blood Type:
                      <select
                        name="mother_blood_type"
                        value={currentChild?.mother_blood_type || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </label>
                    <br />
                    <label>
                      Citizenship:
                      <input
                        type="text"
                        name="mother_citizenship"
                        value={currentChild?.mother_citizenship || ""}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Occupation:
                      <input
                        type="text"
                        name="mother_occupation"
                        value={currentChild?.mother_occupation || ""}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Father's Information */}
                <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
                  Father's Info
                </h2>
                <div className="form-section">
                  <div className="form-column">
                    <label>
                      First Name:
                      <input
                        type="text"
                        name="father_fname"
                        value={currentChild?.father_fname || ""}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Middle Name:
                      <input
                        type="text"
                        name="father_mname"
                        value={currentChild?.father_mname || ""}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Last Name:
                      <input
                        type="text"
                        name="father_lname"
                        value={currentChild?.father_lname || ""}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      Blood Type:
                      <select
                        name="father_blood_type"
                        value={currentChild?.father_blood_type || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </label>
                    <br />
                    <label>
                      Citizenship:
                      <input
                        type="text"
                        name="father_citizenship"
                        value={currentChild?.father_citizenship || ""}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Occupation:
                      <input
                        type="text"
                        name="father_occupation"
                        value={currentChild?.father_occupation || ""}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="modal-actions1">
                  <button type="button" onClick={handleSave}>
                    Save
                  </button>
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

      {isInjectModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content2">

            <h2>Shot Child</h2>
            <form onSubmit={handleInjectFormSubmit}
            >
              {/* Child Information */}

              <label>
                Child Name:
                <input
                  type="text"
                  name="first_name"
                  value={currentChild?.first_name + " " + currentChild?.middle_name + " " + currentChild?.last_name}
                  onChange={handleChange}
                  readOnly
                />
              </label>

              <label>
              Vaccine Name:
              <select name="vaccine_name" onChange={handleVaccineChange}  required>
             
                <option value="">Select Vaccine</option>
                {vaccineList.map((vaccine, index) => (
                  <option key={index} value={vaccine}>
                    {vaccine}
                  </option>
                ))}
              </select>
            </label>
            <br />
            {/* Dose Selection */}
        {doseList.length > 0 && (
          <label>
            Select Dose:
            <select
            
              value={doseList[0]} // Defaulting to the first dose
              onChange={(e) => setDoseList([parseInt(e.target.value)])} // Set the selected dose
            >
              
              {doseList.map((dose, index) => (
                <option key={index} value={dose}>
                  Dose {dose}
                </option>
              ))}
            </select>
          </label>
        )}
              <br />
             {/* Modal Actions */}
              <div className="modal-actions2">
                <button type="button" onClick={handleInjectSave}>
                  Save
                </button>
                <button type="button" onClick={closeInjectModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>


        </div>
      )}
    </div>
  );
};

export default ManageChildren;
