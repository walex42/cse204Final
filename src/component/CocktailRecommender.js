import { useState } from 'react';
import axios from 'axios';
import Questionnaire from './Questionnaire';
import './Recommender.css';

function CocktailRecommender() {
  const [recommendedCocktails, setRecommendedCocktails] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [favorites, setFavorites] = useState([]);


  const handleAnswersSubmit = (answers) => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php', {
      params: {
        i: answers.preferredLiquor,
        f: answers.flavorProfile,
        s: answers.sweetnessLevel
      }
    })
    .then(response => {
      setRecommendedCocktails(response.data.drinks);
      setSelectedCocktail(null);
      console.log(response.data.drinks)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleCocktailSelect = (cocktail) => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php', {
      params: {
        i: cocktail.idDrink
      }
    })
    .then(response => {
      setSelectedCocktail(response.data.drinks[0]);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleFavoriteToggle = (cocktail) => {
    const existingIndex = favorites.findIndex(fav => fav.idDrink === cocktail.idDrink);
    if (existingIndex > -1) {
      setFavorites(favorites.filter(fav => fav.idDrink !== cocktail.idDrink));
    } else {
      setFavorites([...favorites, cocktail]);
    }
  }

  return (
    <div className="cocktail-recommender">
      <h1 className='intro'>Everyone has a perfect cocktail!</h1>
      <h2 className='intro'>Fill out the form below to find yours!</h2>
      <p>Must select all 3</p>
      <Questionnaire onAnswersSubmit={handleAnswersSubmit} />

      <div className="recommended-cocktails">
        {recommendedCocktails.map(cocktail => (
          <div key={cocktail.idDrink} className="cocktail-card">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h2>{cocktail.strDrink}</h2>
            <button onClick={() => window.location.href = `/cocktail/${cocktail.idDrink}`}>View Recipe</button>
            <button onClick={() => handleFavoriteToggle(cocktail)}>
              {favorites.some(fav => fav.idDrink === cocktail.idDrink) ? 'Unfavorite' : 'Favorite'}
            </button>
          </div>
        ))}
      </div>

      {selectedCocktail && (
        <div className="selected-cocktail">
          <h2>{selectedCocktail.strDrink}</h2>
          <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} />
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(selectedCocktail).filter(key => key.startsWith('strIngredient') && selectedCocktail[key]).map(key => (
              <li key={key}>{selectedCocktail[key]} - {selectedCocktail['strMeasure' + key.substring(13)]}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{selectedCocktail.strInstructions}</p>
        </div>
      )}

      <div className="favorites">
        <h2>Favorites</h2>
        <ul>
          {favorites.map(cocktail => (
            <li key={cocktail.idDrink}>
            {cocktail.strDrink}
            <button onClick={() => window.location.href = `/cocktail/${cocktail.idDrink}`}>View Recipe</button>
            <button onClick={() => handleFavoriteToggle(cocktail)}>Unfavorite</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default CocktailRecommender;