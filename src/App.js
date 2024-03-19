import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";
import { GlobalProvider } from "./context/GlobalState";
import gif from "./videos and images/et.gif";

function App() {
  return (
    <GlobalProvider>
    <div className="cover">
      <div className="img-con">
        <img src={gif} alt="Animated GIF" />
      </div>
      <div className="container">
        <Header />
        <div className="con-wrapper">
          <div className="con1">
            <Balance />
            <IncomeExpenses />
          </div>
        </div>
        <div className="con-wrapper">
          <div className="con2">
            <AddTransaction />
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
    </GlobalProvider>
  );
}

export default App;