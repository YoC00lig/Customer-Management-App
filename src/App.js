import AddCustomer from './components/Customers/AddCustomer';
import CustomerList from './components/Customers/CustomerList';
import React, { useState, useEffect } from 'react';


function App() {
  const [db, setDb] = useState(null);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const openRequest = indexedDB.open('CustomersDB', 1);

    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore('customers', { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('name', 'name', { unique: false });
    };

    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      setDb(db);
      const transaction = db.transaction(['customers'], 'readonly');
      const objectStore = transaction.objectStore('customers');
      const request = objectStore.getAll();

      request.onsuccess = function(event) {
        setCustomers(event.target.result);
      };

      request.onerror = function(event) {
        console.log('Error getting customers from database');
      };
    };

    openRequest.onerror = function(event) {
      console.log('Error opening database');
    };
  }, []);

  const addCustomerHandler = (cname, caddress, cvatid) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}.${month}.${year}`;

    const customer = { name: cname, address: caddress, vatid: cvatid, date: currentDate };
    const transaction = db.transaction(['customers'], 'readwrite');
    const objectStore = transaction.objectStore('customers');
    const request = objectStore.add(customer);

    request.onsuccess = function(event) {
      console.log('Customer added to database');
      setCustomers([...customers, { ...customer, id: event.target.result }]);
      console.log(customers);
    };

    request.onerror = function(event) {
      console.log('Error adding customer to database');
    };
  };

  const deleteCustomerHandler = (customerId) => {
    const transaction = db.transaction(['customers'], 'readwrite');
    const objectStore = transaction.objectStore('customers');
    const request = objectStore.delete(customerId);
  
    request.onsuccess = function(event) {
      console.log('Customer deleted from database');
      setCustomers(customers.filter(customer => customer.id !== customerId));
    };
  
    request.onerror = function(event) {
      console.log('Error deleting customer from database');
    };
  };

  const editCustomerHandler = (customerId, updatedCustomer) => {
    const transaction = db.transaction(['customers'], 'readwrite');
    const objectStore = transaction.objectStore('customers');
    const request = objectStore.put({ ...updatedCustomer, id: customerId });
  
    request.onsuccess = function (event) {
      console.log('Customer updated in database');
      const updatedCustomers = customers.map((customer) => {
        if (customer.id === customerId) {
          return { ...updatedCustomer, id: customerId };
        } else {
          return customer;
        }
      });
      setCustomers(updatedCustomers);
    };
  
    request.onerror = function (event) {
      console.log('Error updating customer in database');
    };
  };
  
  
  return (
    <div>
      <AddCustomer onAddCustomer={addCustomerHandler}/>
      <CustomerList customers={customers} onDelete={deleteCustomerHandler} onEdit={editCustomerHandler}/>
    </div>
  );
}

export default App;
