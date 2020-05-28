import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  //converts the ingredients object into an array and map each key to an li tag
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType={'Danger'} action={props.cancelOrder}>
        CANCEL
      </Button>
      <Button btnType={'Success'} action={props.continueOrder}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

export default OrderSummary;
