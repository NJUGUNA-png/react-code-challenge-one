import { useState } from "react";

function ExpenseForm({onAddExpense}){
    const [formData, setFormData]= useState({
        description: '',
        amount: '',
        date: '',
        category: ''
    });
    const [errors,setErrors] = useState({});
    
    function handleChange(event){
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFormData({
            ...formData,
            [fieldName]: fieldValue
        });
        if (errors[fieldName]){
            setErrors({
                ...errors,
                [fieldName]: ''
            });
        }
    }

    function validateForm(){
        const newErrors = {};

        if(!formData.description.trim()){
            newErrors.description = 'Description is required';
        }
        if(!formData.amount){
            newErrors.amount = 'Amount is required';
        }else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0){
            newErrors.amount = 'Amount must be a positive number';
        }

        if (!formData.date){
            newErrors.date = 'Date is required';
        }

        if (!formData.category){
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event){
        event.preventDefault();

        const isValid = validateForm();

        if (isValid){
            const newExpense = {
                ...formData,
                amount: parseFloat(formData.amount),
                id: Date.now()
            };

            onAddExpense(newExpense);

            setFormData({
                decription: '',
                amount: '',
                date:'',
                category:''
            });
        }
    }

    return (
        <div className="expense-form-container">
          <h2>Add New Expense</h2>
          
          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What did you spend on?"
              />
              {errors.description && <p className="error-text">{errors.description}</p>}
            </div>
    
            
            <div className="form-group">
              <label htmlFor="amount">Amount ($):</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.amount && <p className="error-text">{errors.amount}</p>}
            </div>
    
            
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <p className="error-text">{errors.date}</p>}
            </div>
    
            
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">-- Select a category --</option>
                <option value="Food">Food</option>
                <option value="Insurance">Transportation</option>
                <option value="Housing">Housing</option>
                <option value="Savings">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="error-text">{errors.category}</p>}
            </div>
    
            
            <button type="submit">Add Expense</button>
          </form>
        </div>
      );
    }
    
    export default ExpenseForm;
