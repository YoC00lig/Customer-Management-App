import React,{useState} from "react";
import Card from "./Card";
import classes from "../Customers/AddCustomer.module.css";
import Button from "./Button";
import Wrapper from "./Wrapper";

const Edit = props => {
    const [eneteredName, setEnteredName] = useState('');
    const [eneteredID, setEnteredID] = useState('');
    const [eneterdAddress, setEnteredAddress] = useState('');

    const editHandler = (event) => {
        event.preventDefault();

        if (eneteredName.trim().length === 0 || eneterdAddress.trim().length === 0 ||
        eneteredID.trim().length === 0 ) {
            return;
        }

        if (+eneteredID < 0){ 
            return;
        }

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}.${month}.${year}`;
        
        props.onEdit(props.id, {name: eneteredName, address: eneterdAddress, vatid: eneteredID, date: currentDate});
        props.onConfirm();
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

    return <Wrapper>
        <Card className={classes.input}>
            <form onSubmit={editHandler}>
                <label htmlFor="username">Name</label>
                <input id = "username" type="text" value ={eneteredName} onChange={nameChanged}/>

                <label htmlFor="vatid">VAT ID</label>
                <input id = "vatid" type="number" value ={eneteredID} onChange={idChanged}/>

                <label htmlFor="address">Address</label>
                <input id = "address" type="text" value={eneterdAddress} onChange={addressChanged}/>

                <Button type="submit">Edit Customer</Button>
            </form>
        </Card>
    </Wrapper>
}

export default Edit;