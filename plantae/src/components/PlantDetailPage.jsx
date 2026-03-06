import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CareFact from './CareFact';

const PlantDetailPage = ({ plants, onEdit, onDelete }) => {
  const { id } = useParams();
  const plant = plants.find(p => p.id === parseInt(id));

  if (!plant) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#2d5a27' }}>
        <h2>Plant not found</h2>
        <Link to="/" className="back-link">Return to Garden</Link>
      </div>
    );
  }

  return (
    <div className="plant-detail-page">
      <Link to="/" className="back-link">← Back to Garden</Link>
      
      <div className="detail-container">
        <div className="detail-image">
          <img src={plant.imageUrl} alt={plant.name} />
        </div>
        
        <div className="detail-info">
          <h1>{plant.name}</h1>
          <p className="latin-name"><i>{plant.species}</i></p>

          <div className="detail-actions">
            <button 
              className="edit-btn-small"
              onClick={() => onEdit(plant)}
            >
              Edit Plant
            </button>
            <button 
              className="delete-btn-small"
              onClick={() => {
                onDelete(plant.id);
              }}
            >
              Delete Plant
            </button>
          </div>

          <div className="care-section">
            <h3>Plant Care & Info</h3>
            <div className="care-facts-grid">
              <CareFact label="Light" value={plant.light} />
              <CareFact label="Water" value={plant.water} />
            </div>
          </div>

          <div className="secret-fact-box">
            <h4>Secret Fact</h4>
            <p>{plant.secretfact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailPage;