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
}