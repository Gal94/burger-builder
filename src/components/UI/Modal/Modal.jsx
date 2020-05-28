import React from 'react';
import classes from './Modal.module.css';

//Order Summary it the props.children
const Modal = (props) => <div className={classes.Modal}>{props.children}</div>;

export default Modal;
