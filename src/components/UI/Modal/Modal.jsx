import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

//Order Summary it the props.children
class Modal extends Component {
  //nextProps-nextState are the newly props and state values (before modifying the current state/props)
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    ) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
