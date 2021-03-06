import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function Accereq() {

    const location = useLocation();
  const data17 = location.state;

  const [req13,setReq13]=useState({
    "amount": "",
    "amountPayed": "",
    "amountPayedBack": "",
    "days": "",
    "fromName": "",
    "interest": "",
    "toName": "",
    "transactionId": [{"toEmail": "", "fromEmail": ""}],
    "uniqueId": ""
  })
  const [req14,setReq14]=useState({
    "amount": ""
  })
  
  useEffect(() => {
    // fetchTransactions();
    fetchTransactiondetails();
  }, [])

  const fetchTransactiondetails = () =>{
    // setIsShown(current => !current);
    fetch("http://localhost:9002/transaction/"+(data17),
    {
      method:"GET",
      // body:JSON.stringify(users),
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : JSON.parse(localStorage.getItem('token')) 
      },
    })
    .then(response => response.json())
    .then(result => {setReq13(result)})
  }

  const handlePayment =()=>{
    // setReq14(req13.amount=req14.amount)
    setReq14((req14.amount=req13.amount))
    console.log(JSON.stringify(req14))
    fetch("http://localhost:9002/transaction/pay/"+(req13.transactionId.toEmail)+"/"+(req13.transactionId.fromEmail)+"/"+(req13.uniqueId),
    {
      method:"POST",
      body:JSON.stringify(req14),
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : JSON.parse(localStorage.getItem('token')) 
      },
    }).then(response => response.json())
    .then(result => {console.log(result)})
    .then(window.location.reload())
  } 
  return (
    <div><Link to="/Receivedreq" style={{color:"#FF5B00",fontSize:"30px",float:"left"}}>Back</Link> 
    <h1>Amount:{req13.amount}</h1>
    <h1>Duration:{req13.days}</h1>
    <h1>Interest:{req13.interest}</h1>
    <h1>Request from:{req13.fromName}</h1>
    <h1>Amount Payed:{req13.amountPayed}</h1>
    <h1>Amount Payed Back:{req13.amountPayedBack}</h1>
    <button onClick={handlePayment}>Pay Rs {req13.amount}</button>
    <button>Remove</button>
    </div>
  )
}

export default Accereq