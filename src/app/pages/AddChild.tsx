import React, { useState } from "react";
import axios from "axios";
import "../styles/AddChild.css"; // Import the CSS file

const AddChildForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    sex: "",
    birthdate: "",
    address: "",
    place_of_birth: "",
    birth_method: "",
    child_blood_type: "",
    number: "",
    mother_fname: "",
    mother_mname: "",
    mother_lname: "",
    mother_blood_type: "",
    mother_citizenship: "",
    mother_occupation: "",
    father_fname: "",
    father_mname: "",
    father_lname: "",
    father_blood_type: "",
    father_citizenship: "",
    father_occupation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/add-child",
        formData
      );
      if (response.data === "Child info saved successfully.") {
        alert("Successfully Saved!");
        
      } else {
        alert("Failed to save data!");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again later.");
    }
  };

  return (
    <div className="scrollable-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
          Child Info / Add Child
        </h2>
        <div className="form-section">
          <div className="form-column">
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Middle Name:
              <input
                type="text"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Sex:
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              Birthdate:
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-column">
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Place of Birth:
              <input
                type="text"
                name="place_of_birth"
                value={formData.place_of_birth}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Birth Method:
              <input
                type="text"
                name="birth_method"
                value={formData.birth_method}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Blood Type:
              <select
                name="child_blood_type"
                value={formData.child_blood_type}
                onChange={handleChange}
                required
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
            <label>
              Emergency No.:
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>

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
                value={formData.mother_fname}
                onChange={handleChange}
              />
            </label>
            <label>
              Middle Name:
              <input
                type="text"
                name="mother_mname"
                value={formData.mother_mname}
                onChange={handleChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="mother_lname"
                value={formData.mother_lname}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-column">
            <label>
              Blood Type:
              <select
                name="mother_blood_type"
                value={formData.mother_blood_type}
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
            <label>
              Citizenship:
              <input
                type="text"
                name="mother_citizenship"
                value={formData.mother_citizenship}
                onChange={handleChange}
              />
            </label>
            <label>
              Occupation:
              <input
                type="text"
                name="mother_occupation"
                value={formData.mother_occupation}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

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
                value={formData.father_fname}
                onChange={handleChange}
              />
            </label>
            <label>
              Middle Name:
              <input
                type="text"
                name="father_mname"
                value={formData.father_mname}
                onChange={handleChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="father_lname"
                value={formData.father_lname}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-column">
            <label>
              Blood Type:
              <select
                name="father_blood_type"
                value={formData.father_blood_type}
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
            <label>
              Citizenship:
              <input
                type="text"
                name="father_citizenship"
                value={formData.father_citizenship}
                onChange={handleChange}
              />
            </label>
            <label>
              Occupation:
              <input
                type="text"
                name="father_occupation"
                value={formData.father_occupation}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default AddChildForm;
