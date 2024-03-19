import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  const [textError, setTextError] = useState('');
  const [amountError, setAmountError] = useState('');

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    // Reset states
    setText('');
    setAmount(0);
    setMsg('');
    setTextError('');
    setAmountError('');
    // Validate text
    if (text === '') {
      setTextError('Text is required!!');
      return;
    }
    // Validate amount
    if (amount === 0) {
      setAmountError('Amount must be a non-zero value!!');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
    setMsg("New Transaction Added Successfully !!")
  };

  useEffect(() => {
    if (msg) {
      const timeoutId = setTimeout(() => {
        setMsg('');
      }, 5000);
        return () => clearTimeout(timeoutId);
    }
  }, [msg]);

  return (
    <>
    {msg ? <div style={{ color: '#03ac13', fontWeight: 'bold', fontStyle: 'italic', fontSize: '25px' }}>{msg}</div>:null}
      <h3>ADD NEW TRANSACTION</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          {textError ? <div style={{ color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>{textError}</div>:null}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount (Expense(-) , Income(+))
          </label>
          {amountError ? <div style={{ color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>{amountError}</div>:null}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};
