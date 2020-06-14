import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
  //convert the ingredients object into an array
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  //map through all ingredients and create span tags for them
  const ingredientsOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
