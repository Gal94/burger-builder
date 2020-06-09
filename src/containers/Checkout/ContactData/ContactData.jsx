import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      streed: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    //alert(':)');
    //.json is only used in firebase databases
    const order = {
      ingredients: this.props.ingredients,
      //Price usually is being calculated in the back end
      price: this.props.totalPrice,
      customer: {
        name: 'Gal Y',
        address: {
          street: 'My string13',
          zipCode: '74362',
          country: 'Israel',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    try {
      const response = await axios.post('/orders.json', order);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
  };

  render() {
    let form = (
      <form>
        <h4>Enter your Contact Data</h4>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="postalCode"
        />
        <Button btnType="Success" action={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default ContactData;
