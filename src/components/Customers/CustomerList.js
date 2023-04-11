import React, {useState} from "react";
import Card from "../UI/Card";
import classes from "./CustomerList.module.css"
import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import Edit from "../UI/Edit";
import Modal from "../UI/Modal";


const CustomerList = props => {

    const [modal, setModal] = useState(false);
    const [id, setId] = useState(null);

    const deleteHandler = (id) => {
        props.onDelete(id);
    };

    const editHandler = (id, edited) => {
        props.onEdit(id, edited);
    };

    const confirmModal = () => {
        setModal(false);
    }

    const setCurrentID = (newID) => {
        setModal(!modal);
        setId(newID);
    }

    return <Wrapper>
        {modal && (<Modal title={"Input new parameter"} content={<Edit onEdit={editHandler} id={id} onConfirm={confirmModal}/>}  onConfirm={confirmModal} />)}
        <Card className={classes.customers}>
         <ul>
        {props.customers.map(customer => 
            <li>
                <p>Full name: {customer.name}</p>
                <p>Address: {customer.address}</p> 
                <p>Vat ID number: {customer.vatid}</p>
                <p>Date: {customer.date}</p>
                <div>
                    <Button onClick={() => deleteHandler(customer.id)}>DELETE</Button>
                    <Button onClick={() => setCurrentID(customer.id)} onConfirm={confirmModal} >UPDATE</Button>
                </div>
            </li>)}
        </ul>
    </Card>
    </Wrapper>
};

export default CustomerList;