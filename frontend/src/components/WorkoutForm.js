import { useState } from 'react';

const WorkoutForm = () => {
  const [searchResults, setSearchResults] = useState([]);

  const [name, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name) {
      setError('Name is required');
      return;
    }
  
    try {
      const encodedName = encodeURIComponent(name);
      const response = await fetch(`http://localhost:4000/api/stops/search/${encodedName}`);
  
      const data = await response.json(); // Parse the response data
  
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
        setError(null);
        setEmptyFields([]);
      } else {
        setSearchResults([]);
        setError('No matching stops found.');
        setEmptyFields([]);
      }
    } catch (error) {
      console.error('Error searching for stops:', error);
      setSearchResults([]);
      setError('An error occurred while searching for stops.');
      setEmptyFields([]);
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
      onChange={(e) => setTitle(e.target.value)}
      value={name}
      className={emptyFields.includes('title') ? 'error' : ''}
    />

    <label>Location A:</label>
    <input
      type="string"
      onChange={(e) => setLoad(e.target.value)}
      value={load}
      className={emptyFields.includes('load') ? 'error' : ''}
    />

    <label>Location B</label>
    <input
      type="string"
      onChange={(e) => setReps(e.target.value)}
      value={reps}
      className={emptyFields.includes('reps') ? 'error' : ''}
    />

    <button>Search Bus</button>
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
