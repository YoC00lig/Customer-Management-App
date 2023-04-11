import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddCustomer.module.css";
import Button from '../UI/Button'
import Wrapper from "../UI/Wrapper";
import Modal from "../UI/Modal";


const AddCustomer = props => {
    const [eneteredName, setEnteredName] = useState('');
    const [eneteredID, setEnteredID] = useState('');
    const [eneterdAddress, setEnteredAddress] = useState('');
    const [error, setError] = useState();

    const addHandler = (event) => {
        event.preventDefault();

        if (eneteredName.trim().length === 0 || eneterdAddress.trim().length === 0 ||
        eneteredID.trim().length === 0 ) {
            setError({
                title: 'Invalid input',
                content: "You entered empty value"
            })
            return;
        }

        if (+eneteredID < 0){
            setError({
                title: 'Invalid input',
                content: "ID must be a positive number"
            })
            return;
        }
        
        props.onAddCustomer(eneteredName, eneterdAddress, eneteredID);
        setEnteredName('');
        setEnteredID('');
        setEnteredAddress('');
    }

    const nameChanged = (event) => {
        setEnteredName(event.target.value);
    }

    const idChanged = (event) => {
        setEnteredID(event.target.value);
    }

    const addressChanged = (event) => {
        setEnteredAddress(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return <Wrapper>
        {error && (<Modal title={error.title} content={error.content}  onConfirm={errorHandler}/>)}
        <Card className={classes.input}>
            <form onSubmit={addHandler}>
                <label htmlFor="username">Name</label>
                <input id = "username" type="text" value ={eneteredName} onChange={nameChanged}/>

                <label htmlFor="vatid">VAT ID</label>
                <input id = "vatid" type="number" value ={eneteredID} onChange={idChanged}/>

                <label htmlFor="address">Address</label>
                <input id = "address" type="text" value={eneterdAddress} onChange={addressChanged}/>

                <Button type="submit">Add Customer</Button>
            </form>
        </Card>
    </Wrapper>
};


export default AddCustomer;