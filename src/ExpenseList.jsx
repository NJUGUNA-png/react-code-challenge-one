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

    
}