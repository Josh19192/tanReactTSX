import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageVac.css"; // Include CSS for styling

const ManageVac: React.FC = () => {
  const [vaccines, setVaccines] = useState<any[]>([]); // Array of vaccines
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const [currentVaccine, setCurrentVaccine] = useState<any | null>(null); // Currently selected vaccine for edit
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch vaccine data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/vaccine")
      .then((response) => {
        setVaccines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vaccine data:", error);
      });
  }, []);

  // Opens the modal and sets the current vaccine for editing
  const openModal = (vaccine: any) => {
    setCurrentVaccine(vaccine);
    setIsModalOpen(true);
  };

  // Closes the modal and resets the current vaccine
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVaccine(null);
  };

  // Saves the updated vaccine
  const handleSave = () => {
    if (!currentVaccine || !currentVaccine.id) {
      console.error("Error: Missing ID or vaccine data");
      return;
    }

    axios
      .put(`http://localhost:3001/vaccine/${currentVaccine.id}`, currentVaccine)
      .then(() => {
        setVaccines((prev) =>
          prev.map((vaccine) =>
            vaccine.id === currentVaccine.id
              ? { ...vaccine, ...currentVaccine }
              : vaccine
          )
        );
        closeModal();
        alert("Vaccine updated successfully!"); // Success message
      })
      .catch((error) => {
        console.error("Error updating vaccine:", error);
      });
  };

  // Deletes a vaccine
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete vaccine with ID: ${id}?`
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/vaccine/${id}`)
        .then(() => {
          setVaccines((prev) => prev.filter((vaccine) => vaccine.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting vaccine:", error);
        });
    }
  };

  // Filtered vaccines based on search query
  const filteredVaccines = vaccines.filter((vaccine) =>
    vaccine.vaccine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vaccine.vaccine_brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        MANAGE VACCINE
      </h2>

      {/* Search Bar */}
      <div style={{marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Vaccine Name or Brand"
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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vaccine Name</th>
            <th>Vaccine Brand</th>
            <th>Dose</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVaccines.map((vaccine) => (
            <tr key={vaccine.id}>
              <td>{vaccine.id}</td>
              <td>{vaccine.vaccine_name}</td>
              <td>{vaccine.vaccine_brand}</td>
              <td>{vaccine.dose}</td>
              <td>
                <button
                  onClick={() => openModal(vaccine)}
                  className="edit-button"
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i> {/* Edit icon */}
                </button>
                <button
                  onClick={() => handleDelete(vaccine.id)}
                  className="delete-button"
                >
                  <i className="fa fa-trash" aria-hidden="true"></i> {/* Delete icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Vaccine</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <label>
                Vaccine Name:
                <input
                  type="text"
                  value={currentVaccine?.vaccine_name || ""}
                  onChange={(e) =>
                    setCurrentVaccine((prev: any) => ({
                      ...prev,
                      vaccine_name: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label>
                Vaccine Brand:
                <input
                  type="text"
                  value={currentVaccine?.vaccine_brand || ""}
                  onChange={(e) =>
                    setCurrentVaccine((prev: any) => ({
                      ...prev,
                      vaccine_brand: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label>
                Dose:
                <input
                  type="number"
                  value={currentVaccine?.dose || ""}
                  onChange={(e) =>
                    setCurrentVaccine((prev: any) => ({
                      ...prev,
                      dose: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <div className="modal-actions">
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
      )}
    </div>
  );
};

export default ManageVac;
