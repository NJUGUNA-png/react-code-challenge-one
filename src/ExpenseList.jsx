import { useState } from "react";

function ExpenseList({expenses, onDeleteExpense}){

    const [searchTerm, setSearchTerm] = useState('');

    const[sortConfig, setSortConfig]= useState({
        key: null,
        direction: 'ascending'
    });

    function handleSearchChange(event){
        setSearchTerm(event.target.value);
    }

    const filteredExpenses = expenses.filter(expense =>{
        const descriptionMatch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = expense.category.toLowerCase().includes(searchTerm.toLowerCase());

        return descriptionMatch || categoryMatch;
    })
}