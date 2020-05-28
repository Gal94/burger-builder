import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

//Order Summary it the props.children
const Modal = (props) => (
  <React.Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
      className={classes.Modal}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;
