import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  //preview of the burger
  //buttons

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        {/* Burger Preview */}
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" action={props.CheckoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" action={props.CheckoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
