import { useState } from "react";
import './App.css'
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function App(){
  const [expenses, setExpenses]= useState([
    {
      id: 1,
      description:"Gym Membership",
      amount: 100,
      date: "2025-04-12",
      category: "Health"
    },
    {
      id: 2,
      description:"Monthly rent",
      amount:1500,
      date: "2025-04-30",
      category: "Housing"
    },
    {
      id:3,
      description:"Gas Bill",
      amount: 60,
      date: "2025-04-15",
      category: "Utilities"
    }
  ])
}