import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { PieChart } from 'react-minimal-pie-chart';

function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const incomeTransactions = transactions.filter((item) => item.amount > 0);
  const expenseTransactions = transactions.filter((item) => item.amount < 0);

  const [incomeColors, setIncomeColors] = useState({});
  const [expenseColors, setExpenseColors] = useState({});

  useEffect(() => {
    const generateColors = (type, existingColors) => {
      const newColors = {};
      transactions
        .filter((item) => (type === 'income' ? item.amount > 0 : item.amount < 0))
        .forEach((transaction) => {
          newColors[transaction.id] = existingColors[transaction.id] || getRandomColor();
        });
      return newColors;
    };

    setIncomeColors((prevIncomeColors) => generateColors('income', prevIncomeColors));
    setExpenseColors((prevExpenseColors) => generateColors('expense', prevExpenseColors));
  }, [transactions]);
  
  const incomeData = incomeTransactions.length
    ? incomeTransactions.map((transaction) => ({
        title: transaction.text,
        value: transaction.amount,
        color: incomeColors[transaction.id],
      }))
    : [{ value: 1, color: '#fff' }];

  const expenseData = expenseTransactions.length
    ? expenseTransactions.map((transaction) => ({
        title: transaction.text,
        value: Math.abs(transaction.amount),
        color: expenseColors[transaction.id],
      }))
    : [{ value: 1, color: '#fff' }];

  const totalIncome = incomeTransactions.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = Math.abs(expenseTransactions.reduce((acc, item) => acc + item.amount, 0));

  return (
    <div className="con">
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">{`₹ ${moneyFormatter(totalIncome)}`}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">{`₹ ${moneyFormatter(totalExpense)}`}</p>
        </div>
      </div>
      <div className="pie-chart-container">
        <div className="pie-chart">
          <PieChart
            data={incomeData}
            lineWidth={100}
            label={({ dataEntry }) =>
              incomeTransactions.length
                ? `${dataEntry.title} : +₹ ${moneyFormatter(dataEntry.value)}`
                : 'No Income yet !!'
            }
            labelStyle={{
              fontSize: '5px',
              fontFamily: 'Arial, sans-serif',
              fill: expenseTransactions.length ? '#fff' : '#000',
            }}
          />
        </div>
        <div className="pie-chart">
          <PieChart
            data={expenseData}
            lineWidth={100}
            label={({ dataEntry }) =>
              expenseTransactions.length
                ? `${dataEntry.title} : -₹ ${moneyFormatter(dataEntry.value)}`
                : 'No Expenses yet !!'
            }
            labelStyle={{
              fontSize: '5px',
              fontFamily: 'Arial, sans-serif',
              fill: expenseTransactions.length ? '#fff' : '#000',
            }}
          />
        </div>
      </div>
    </div>
  );
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
