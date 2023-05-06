import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import CocktailRecommender from './component/CocktailRecommender';
import CocktailRecipe from './component/CocktailRecipe';

function App() {
  return (

      <div className="App">
        <header>
          <h1><a href="/">Tail4You</a></h1>
          <img src="../logo.png" alt="Logo"></img>
        </header>

        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <CocktailRecommender />
            </Route>
            <Route path="/cocktail/:id">
              <CocktailRecipe />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>

  );
}

export default App;
