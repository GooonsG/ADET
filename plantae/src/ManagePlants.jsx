import React, { useState } from 'react';
import PlantCard from './components/PlantCard';
import PlantModal from './components/PlantModal';
import AddPlantModal from './components/AddPlantModal';

const ManagePlants = ({ plants, onBack, onSavePlant, onDeletePlant, onAddPlant }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [editingPlant, setEditingPlant] = useState(null);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);

  const handleEdit = (plant) => {
    setEditingPlant(plant);
    setSelectedPlant(plant);
  };

  const handleDelete = (plantId) => {
    if (window.confirm('Are you sure you want to delete this plant? This action cannot be undone.')) {
      onDeletePlant(plantId);
    }
  };

  const handleSave = (updatedPlant) => {
    onSavePlant(updatedPlant);
    setEditingPlant(null);
    setSelectedPlant(null);
  };

  return (
    <div className="manage-plants-page">
      <header className="manage-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Garden
        </button>
        <h1>Manage Plants</h1>
        <div className="manage-header-right">
          <div className="plant-count">
            {plants.length} plant{plants.length !== 1 ? 's' : ''}
          </div>
          <button className="icon-circle-btn" onClick={() => setIsAddPlantOpen(true)}>
            <span className="plus-icon">+</span>
          </button>
        </div>
      </header>

      <main className="manage-container">
        {plants.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">No plants yet. Add your first plant!</p>
            <button className="add-plant-btn" onClick={() => setIsAddPlantOpen(true)}>
              + Add Plant
            </button>
          </div>
        ) : (
          <div className="plants-grid">
            {plants.map((plant) => (
              <div key={plant.id} className="manage-plant-card">
                <PlantCard 
                  plant={plant} 
                  onCardClick={() => setSelectedPlant(plant)} 
                />
                <div className="manage-actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEdit(plant)}
                  >
                    ✎ Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(plant.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* View Modal */}
      <PlantModal 
        plant={selectedPlant && !editingPlant ? selectedPlant : null} 
        onClose={() => setSelectedPlant(null)} 
        onSave={() => {}} // Read-only for viewing
      />

      {/* Edit Modal */}
      {editingPlant && (
        <PlantModal 
          plant={editingPlant} 
          onClose={() => {
            setEditingPlant(null);
            setSelectedPlant(null);
          }} 
          onSave={handleSave} 
        />
      )}

      {/* Add Plant Modal */}
      {isAddPlantOpen && (
        <AddPlantModal 
          onClose={() => setIsAddPlantOpen(false)}
          onAddPlant={onAddPlant}
        />
      )}
    </div>
  );
};

export default ManagePlants;