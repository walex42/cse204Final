import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Recipe.css'

const CocktailRecipe = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => setCocktail(response.data.drinks[0]))
      .catch((error) => console.log(error));
  }, [id]);

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe">
      <h2>{cocktail.strDrink}</h2>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <div className="container">
      <div className="ingredients">
        <h3>Ingredients:</h3>
        <ul>
          {Array.from({ length: 15 }, (_, i) => i + 1)
            .filter((i) => cocktail[`strIngredient${i}`])
            .map((i) => (
              <li key={i}>
                {cocktail[`strMeasure${i}`]} {cocktail[`strIngredient${i}`]}
              </li>
            ))}
        </ul>
      </div>
      <div className="instructions">
        <h3>Instructions:</h3>
        <p>{cocktail.strInstructions}</p>
      </div>
      </div>
    </div>
  );
};

export default CocktailRecipe;
