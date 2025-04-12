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

    function handleSort(key){

        if (sortConfig.key === key){
            setSortConfig({
                key:key,
                direction: sortConfig.direction === 'ascending'? 'descending' : 'ascending'
            });
        }else{
            setSortConfig({
                key: key,
                direction: 'ascending'
            });
        }
    }

    const sortedExpenses = [...filteredExpenses].sort((a,b) => {
        if (!sortConfig.key){
            return 0;
        }
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA < valueB){
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valueA > valueB){
            return sortConfig.direction === 'ascending' ? 1 : -1
        }

        return 0;
    });

    function formatDate (dateString){
        const options = { year: 'numeric', month: 'short', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function handleDelete(id){
        if (window.confirm('Are you sure you want to delete this expense?')){
            onDeleteExpense(id);
        }
    }
}