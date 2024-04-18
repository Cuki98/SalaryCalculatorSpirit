import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [creditHours, setCreditHours] = useState('');
  const [tafb, setTafb] = useState('');
  const [total, setTotal] = useState('');
  const [payrate, setPayrate] = useState(25.80); // Initial pay rate

  const tafbRate = 2.82;

  useEffect(() => {
    calculate(); // Recalculate total whenever payrate, creditHours, or tafb changes
  }, [payrate, creditHours, tafb]);

  const calculate = () => {
    const creditHoursInt = parseInt(creditHours);
    const tafbInt = parseInt(tafb);
    const overtimePay = payrate * 1.5;

    // Calculate overtime pay
    const overtimeHours = Math.max(creditHoursInt + 72 - 85, 0);
    const overtimeSalary = overtimeHours * overtimePay;

    // Calculate regular pay
    const regularCreditHours = Math.max(creditHoursInt - overtimeHours, 0);
    const CreditHoursSalary = regularCreditHours * payrate;
    const tafbSalary = tafbInt * tafbRate;
    const regular = payrate * 36;
    const Total = tafbSalary + overtimeSalary + CreditHoursSalary + regular;

    setTotal(Total.toFixed(2));
  }

  const handlePayrateChange = (newRate) => {
    setPayrate(newRate);
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Pay Rate</h2>
        <button onClick={() => handlePayrateChange(25.80)}>Pay Rate $25.80</button>
        <button onClick={() => handlePayrateChange(30.50)}>Pay Rate $30.18</button>
        <button onClick={() => handlePayrateChange(35.75)}>Pay Rate $32.41</button>
      </div>
      <div className="content">
        <h2>Salary Calculator</h2>
        <div className="input-group">
          <label htmlFor="creditHours">Credit Hours:</label>
          <input type="number" id="creditHours" value={creditHours} onChange={(e) => setCreditHours(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="tafb">TAFB:</label>
          <input type="number" id="tafb" value={tafb} onChange={(e) => setTafb(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="TotalField">Total:</label>
          <input type="text" id="TotalField" value={total} readOnly />
        </div>
      </div>
    </div>
  );
}

export default App;
