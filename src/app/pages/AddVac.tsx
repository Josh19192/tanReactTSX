import React, { useState } from 'react';

const AddVaccineForm: React.FC = () => {
  const [formData, setFormData] = useState({
    vaccine_name: '',
    vaccine_brand: '',
    dose: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [isHovered, setIsHovered] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/add-vaccine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Vaccine saved successfully!');
        setFormData({ vaccine_name: '', vaccine_brand: '', dose: '' }); // Reset form
      } else {
        alert('Error saving vaccine. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while saving the vaccine.');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>ADD VACCINE</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <div className="form-column">
            <label>
              Vaccine Name:
              <input
                type="text"
                id="vaccine_name"
                name="vaccine_name"
                value={formData.vaccine_name}
                onChange={handleChange}
                placeholder="Enter vaccine name"
                required
              />
            </label>

            <label>
              Vaccine Brand:
              <input
                type="text"
                id="vaccine_brand"
                name="vaccine_brand"
                value={formData.vaccine_brand}
                onChange={handleChange}
                placeholder="Enter vaccine brand"
                required
              />
            </label>
          </div>
          <div className="form-column">
            <label>
              Dose Number:
              <input
                type="number"
                id="dose"
                name="dose"
                value={formData.dose}
                onChange={handleChange}
                placeholder="Enter dose number"
                required
              />
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
              width:"30%",
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)}  // When mouse enters
            onMouseLeave={() => setIsHovered(false)} // When mouse leaves
          >
            Save Vaccine
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVaccineForm;
