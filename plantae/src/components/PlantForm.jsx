import React, { useState } from 'react';

const PlantForm = ({ plant, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: plant?.id || '',
    name: plant?.name || '',
    species: plant?.species || '',
    imageUrl: plant?.imageUrl || '',
    secretfact: plant?.secretfact || '',
    light: plant?.light || '',
    water: plant?.water || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="plant-form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-x" onClick={onCancel}>×</button>
        <h2 style={{ color: '#2d5a27', marginBottom: '20px' }}>
          {plant ? 'Edit Plant' : 'Add New Plant'}
        </h2>
        
        <form onSubmit={handleSubmit} className="plant-form">
          <div className="form-group">
            <label>Plant Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Species *</label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Light Requirements *</label>
            <input
              type="text"
              name="light"
              value={formData.light}
              onChange={handleChange}
              required
              placeholder="e.g., Bright, Indirect"
            />
          </div>

          <div className="form-group">
            <label>Water Requirements *</label>
            <input
              type="text"
              name="water"
              value={formData.water}
              onChange={handleChange}
              required
              placeholder="e.g., Every 7-10 days"
            />
          </div>

          <div className="form-group">
            <label>Secret Fact *</label>
            <textarea
              name="secretfact"
              value={formData.secretfact}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {plant ? 'Update' : 'Add'} Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlantForm;