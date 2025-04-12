import { useState } from "react";

function ExpenseForm({onAddExpense}){
    const [formData, setFormData]= useState({
        description: '',
        amount: '',
        date: '',
        category: ''
    });
    const [errors,setErrors] = useState({});
}