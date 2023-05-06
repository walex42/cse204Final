import { useState } from 'react';
import './Questionnaire.css';

function Questionnaire({ onAnswersSubmit }) {
  const [preferredLiquor, setPreferredLiquor] = useState('');
  const [flavorProfile, setFlavorProfile] = useState('');
  const [sweetnessLevel, setSweetnessLevel] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswersSubmit({ preferredLiquor, flavorProfile, sweetnessLevel });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="preferred-liquor">Preferred Liquor:</label>
      <select id="preferred-liquor" value={preferredLiquor} onChange={(event) => setPreferredLiquor(event.target.value)}>
        <option value="">Select a liquor</option>
        <option value="Gin">Gin</option>
        <option value="Vodka">Vodka</option>
        <option value="Whiskey">Whiskey</option>
        <option value="Rum">Rum</option>
        <option value="Tequila">Tequila</option>
      </select>

      <label htmlFor="flavor-profile">Flavor Profile:</label>
      <select id="flavor-profile" value={flavorProfile} onChange={(event) => setFlavorProfile(event.target.value)}>
        <option value="">Select a flavor profile</option>
        <option value="Sweet">Sweet</option>
        <option value="Sour">Sour</option>
        <option value="Bitter">Bitter</option>
        <option value="Salty">Salty</option>
        <option value="Spicy">Spicy</option>
      </select>

      <label htmlFor="sweetness-level">Sweetness Level:</label>
      <select id="sweetness-level" value={sweetnessLevel} onChange={(event) => setSweetnessLevel(event.target.value)}>
        <option value="">Select a sweetness level</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Questionnaire;
