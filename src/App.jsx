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
      category: "Healthcare"
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
      description:"SHA Certificate",
      amount: 460,
      date: "2025-04-15",
      category: "Insurance"
    },
    {
      id:4,
      description:"CIC Deposit",
      amount: 2000,
      date: "2025-04-20",
      category: "Savings"
    }
  ]);

  function handleAddExpense(newExpense){
    setExpenses([...expenses,newExpense]);

    alert(`Expense "${newExpense.description}" added successfully!`);
  }

  function handleDeleteExpense(expenseId){

    const expenseToDelete = expenses.find(expense => expense.id === expenseId);

    const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);

    setExpenses(updatedExpenses);

    alert(`Expense "${expenseToDelete.description}" deleted successfully!`);
  }

  const totalAmount = expenses.reduce((sum, expense)=> sum + expense.amount, 0);
  const expenseCount = expenses.length;

  return (
    <div className="expense-tracker-container">
      
      <h1>Your Expense Tracker</h1>
      
    
      <div className="expense-summary">
        <p>
          You have <strong>{expenseCount}</strong> expenses totaling{" "}
          <strong>${totalAmount.toFixed(2)}</strong>
        </p>
      </div>
      
      
      <div className="expense-tracker-content">
        
        <ExpenseForm onAddExpense={handleAddExpense} />
        
      
        <ExpenseList 
          expenses={expenses} 
          onDeleteExpense={handleDeleteExpense} 
        />
      </div>
    </div>
  )
}

export default App
