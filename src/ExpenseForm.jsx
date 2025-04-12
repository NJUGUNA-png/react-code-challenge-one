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
}