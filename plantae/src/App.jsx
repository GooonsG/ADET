import React, { useState } from 'react';
import './styles/App.css'; 
import { plantData } from './data/plants';
import PlantCard from './components/PlantCard';
import PlantModal from './components/PlantModal';
import AddPlantModal from './components/AddPlantModal';
import SettingsSidebar from './components/SettingsSidebar';
import About from './About'; // Import the new About component
import ManagePlants from './ManagePlants'; // Import the ManagePlants component

function App() {
  // 1. INITIAL STATES
  const [allPlants, setAllPlants] = useState(plantData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null); 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [currentView, setCurrentView] = useState('garden'); // 'garden', 'about', or 'manage'

  // 2. FILTER LOGIC
  const filteredPlants = allPlants.filter((plant) => {
    const name = plant.name?.toLowerCase() || "";
    const species = plant.species?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return name.includes(query) || species.includes(query);
  });

  // 3. HANDLER FUNCTIONS
  const handleSavePlant = (updatedPlant) => {
    setAllPlants(prevPlants => 
      prevPlants.map(p => p.id === updatedPlant.id ? updatedPlant : p)
    );
    setSelectedPlant(updatedPlant); 
  };

  const handleAddPlant = (newPlant) => {
    setAllPlants(prevPlants => [...prevPlants, newPlant]);
  };

  const handleDeletePlant = (plantId) => {
    setAllPlants(prevPlants => prevPlants.filter(p => p.id !== plantId));
  };

  // 4. NAVIGATION RENDER
  return (
    <div className="App">
      {currentView === 'garden' ? (
        /* GARDEN VIEW */
        <>
          <SettingsSidebar 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
            onAboutClick={() => {
              setCurrentView('about');
              setIsSettingsOpen(false);
            }}
            onManageClick={() => {
              setCurrentView('manage');
              setIsSettingsOpen(false);
            }}
          />

          <header className="main-header">
            <h1 className="brand-title">Plantae</h1>
            
            <div className="header-controls-container">
              <div className="controls-left">
                <button className="icon-circle-btn" onClick={() => setIsSettingsOpen(true)}>
                  <span className="bar-icon">☰</span>
                </button>
                <button className="icon-circle-btn" onClick={() => window.location.reload()}>
                  <span className="home-icon">⌂</span>
                </button>
              </div>

              <div className="controls-center">
                <input 
                  type="text" 
                  placeholder="Search your garden..." 
                  className="glass-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="controls-right">
                <button className="icon-circle-btn" onClick={() => setIsAddPlantOpen(true)}>
                  <span className="plus-icon">+</span>
                </button>
              </div>
            </div>
          </header>

          <main className="discovery-container">
            <section className="plant-stack">
              {filteredPlants.map((plant) => (
                <PlantCard 
                  key={plant.id} 
                  plant={plant} 
                  onCardClick={setSelectedPlant} 
                />
              ))}
            </section>
          </main>

          <PlantModal 
            plant={selectedPlant} 
            onClose={() => setSelectedPlant(null)} 
            onSave={handleSavePlant} 
          />

          {isAddPlantOpen && (
            <AddPlantModal 
              onClose={() => setIsAddPlantOpen(false)}
              onAddPlant={handleAddPlant}
            />
          )}
        </>
      ) : currentView === 'about' ? (
        /* ABOUT VIEW */
        <About onBack={() => setCurrentView('garden')} />
      ) : currentView === 'manage' ? (
        /* MANAGE PLANTS VIEW */
        <ManagePlants 
          plants={allPlants}
          onBack={() => setCurrentView('garden')}
          onSavePlant={handleSavePlant}
          onDeletePlant={handleDeletePlant}
          onAddPlant={handleAddPlant}
        />
      ) : null}

      <footer className="main-footer">
        <p>© 2026 Plantae Discovery System</p>
      </footer>
    </div>
  );
}

export default App;