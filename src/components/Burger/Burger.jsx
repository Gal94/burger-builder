import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

//transforms the ingredients object into an array in order to render the correct amount of each burger ingredient
const Burger = (props) => {
  //array of the ingredients keys to map through
  let ingredientsArray = Object.keys(props.ingredients)
    .map((ingredientKey) => {
      // For every ingredient key creates an array in the length of its ingredient amount // spread is needed to create that array
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        //for every ingredient key in the array(of ingredients length) renders the amount of ingredients
        return (
          <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        );
      });
    })
    //converts an array or arrays into a single array
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (ingredientsArray.length === 0) {
    ingredientsArray = <p>Please start Adding ingredients!</p>;
  }
  console.log(ingredientsArray);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
