import React, { useState } from 'react';
import axios from 'axios';

const WorkoutForm = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Name is required');
      return;
    }

    setLoading(true);
    setSearchResults([]);
    setError(null);

    try {
      const encodedName = encodeURIComponent(name);
      const response = await axios.get(`http://localhost:4000/api/stops/${encodedName}`);
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
      } else {
        setError('No matching stops found.');
      }
    } catch (error) {
      console.error('Error searching for stops:', error);
      if (error.response) {
        setError('An error occurred while searching for stops: ' + error.response.data.error);
      } else if (error.request) {
        setError('Network error occurred. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };




  const style = {
    position: 'relative',
    marginTop: '10%',
    margin: '5%',
    background: 'white',
    border: '50px white solid',
    borderRadius: '30px',
  };

  return (
    <form className="create" style={style} onSubmit={handleSubmit}>
      <h3>MAKE YOUR SEARCH</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <button type="submit" onClick={handleSubmit}>
        Search Bus
      </button>

      {loading && <div>Loading...</div>}

      {error && <div className="error">{error}</div>}

      {searchResults.length > 0 && (
        <div>
          <h4>Search Results:</h4>
          <ul>
            {searchResults.map((bus) => (
              <li key={bus.id}>
                <strong>Name:</strong> {bus.name}
                <br />
                <strong>Route:</strong> {bus.route}
                <br />
                {/* Display other bus details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};



export default WorkoutForm;
