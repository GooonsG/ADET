import React, { useState } from "react";

const AddPlantModal = ({ onClose, onAddPlant }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    imageUrl: "",
    light: "",
    water: "",
    secretfact: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.species || !formData.imageUrl) {
      alert("Please fill in Name, Species, and Image URL");
      return;
    }

    const newPlant = {
      id: Date.now(),
      ...formData,
    };

    onAddPlant(newPlant);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <h2>Add New Plant</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Form */}
        <div className="modal-body">

          <div className="form-group">
            <label>Plant Name *</label>
            <input
              type="text"
              placeholder="e.g., Rose"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Species / Type *</label>
            <input
              type="text"
              placeholder="e.g., Rosa damascena"
              value={formData.species}
              onChange={(e) => handleChange("species", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="text"
              placeholder="https://example.com/plant.jpg"
              value={formData.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Light Requirements</label>
            <input
              type="text"
              placeholder="Bright, Indirect"
              value={formData.light}
              onChange={(e) => handleChange("light", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Water Schedule</label>
            <input
              type="text"
              placeholder="Every 7-10 days"
              value={formData.water}
              onChange={(e) => handleChange("water", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Secret Fact</label>
            <textarea
              placeholder="Share something interesting about this plant..."
              value={formData.secretfact}
              onChange={(e) => handleChange("secretfact", e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="add-btn" onClick={handleSubmit}>
            Add Plant
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlantModal;