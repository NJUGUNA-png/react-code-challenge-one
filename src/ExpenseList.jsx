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

    function getSortIndicator(key){
        if (sortConfig.key === key){
            return sortConfig.direction === 'ascending' ? '↑' : '↓'; 
        }
        return '';
    }

    return (
        <div className="expense-list-container">
          <h2>Expense List</h2>
          
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by description or category..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          
          {sortedExpenses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  
                  <th onClick={() => handleSort('description')}>
                    Description{getSortIndicator('description')}
                  </th>
                  <th onClick={() => handleSort('category')}>
                    Category{getSortIndicator('category')}
                  </th>
                  <th onClick={() => handleSort('amount')}>
                    Amount{getSortIndicator('amount')}
                  </th>
                  <th onClick={() => handleSort('date')}>
                    Date{getSortIndicator('date')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
            
                {sortedExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{formatDate(expense.date)}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(expense.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            
            <p className="no-expenses-message">
              {expenses.length === 0 
                ? "No expenses yet. Add one using the form." 
                : "No expenses match your search. Try a different term."}
            </p>
          )}
        </div>
      );
    }
    
    export default ExpenseList;
