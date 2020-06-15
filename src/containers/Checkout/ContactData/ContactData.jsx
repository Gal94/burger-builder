import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
          label: 'Name',
        },
        value: '',
        validationKey: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
          label: 'Full Address',
        },
        value: '',
        validationKey: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
          label: 'ZIP Code',
        },
        value: '',
        validationKey: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
          label: 'Country',
        },
        value: '',
        validationKey: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
          label: 'E-Mail',
        },
        value: '',
        validationKey: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
          label: 'Delivery Method',
        },
        value: 'fastest',
        valid: true,
        validationKey: {},
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;

    //true if not an empty string
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  orderHandler = async (event) => {
    event.preventDefault();
    const formData = {};
    //extracts values of the order data from the local state
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    //creates the order object to be pushed into the database
    const order = {
      ingredients: this.props.ingredients,
      //Price usually is being calculated in the back end
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };
    //Moves to the async action which then passes into the dispatcher
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    //Deep copy the orderForm
    const updatedOrderForm = { ...this.state.orderForm };
    //Deep copy the input option
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;

    //validationKey is the rules set up for each input
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validationKey
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    //check if overall form is valid
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      //if all previous forms were valid and current one is valid
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              label={formElement.config.elementConfig.label}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validationKey}
              shouldDisplayFeedback={formElement.config.touched}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
