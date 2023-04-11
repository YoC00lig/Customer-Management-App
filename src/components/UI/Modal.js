import React from "react";
import ReactDOM from 'react-dom';
import Card from "./Card";
import Button from "./Button";
import classes from "./Modal.module.css"



const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
  };

const Overlay = props => {
    return <Card className={classes.modal}>
        <header className={classes.header}>
            <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
            <p>{props.content}</p>
        </div>
        <footer className={classes.actions}>
            <Button onClick={props.onConfirm}>OK</Button>
        </footer>
    </Card>
}

const Modal = props => {
    return <React.Fragment>
        {ReactDOM.createPortal(<Backdrop  onConfirm={props.onConfirm}/>, document.getElementById('backdrop-root'))};
        {ReactDOM.createPortal(<Overlay  title = {props.title} content={props.content} onConfirm={props.onConfirm}/>,
         document.getElementById('modal-root'))}
    </React.Fragment>
};

export default Modal;