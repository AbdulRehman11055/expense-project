import React, { useRef, useState } from 'react'
import Input from './Input'
import Select from './Select'

export default function ExpenseForm({setExpenses,expensee,setExpensee,editingRowId,setEditingRowId}) {
  //FIRST METHOD TO GET INPUTS DATA
  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   const expense={...getFormData(e.target),id:crypto.randomUUID()}
  //   setExpenses((previousState)=>[...previousState,expense])
  //   e.target.reset()
  // }
  // const getFormData=(form)=>{
  //   const formdata=new FormData(form)
  //   const data={}
  //   for(const [key,value] of formdata.entries()){
  //     data[key]=value
  //   }
  //   return data
  // }

  //SECOND METHOD TO GET INPUT DATA USING REACT USESTATE HOOK
  // const [title,setTitle]=useState('')
  // const [category,setCategory]=useState('')
  // const [amount,setAmount]=useState('')
  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   const expense={title,category,amount,id:crypto.randomUUID()}
  //   setExpenses((previiousState)=>[...previiousState,expense])
  //   setTitle('')
  //   setCategory('')
  //   setAmount('')
  // }

  //THIRD METHOD TO GET INPUT DATA USING useRef Hook
  // const titleRef=useRef()
  // const categoryRef=useRef()
  // const amountRef=useRef()
  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   setExpenses((previiousState)=>[...previiousState,{
  //     title:titleRef.current.value,
  //     category:categoryRef.current.value,
  //     amount:amountRef.current.value,
  //     id:crypto.randomUUID()
  //   }])
  // }

  //4TH METHOD OF GET INPUT DATA USING COMBINED STATE HOOK
  //contextmenu mai edit functionality lagany sy pehly yeh state yahin use ho rha tha ab yeh state hum isky parent app.jsx mai use kr rhy or isko as a prop get kr rhy yahan
  // const [expensee, setExpensee] = useState({
  //   title: '',
  //   category: '',
  //   amount: '',
  //   // email:'',
  // })

  const[error,setError]=useState({})
  const validateConfig={
    title:[{required:true,message:"Please enter Title"},
      {minLength:5,message:"Title should be at least 5 characters long"}
    ],
    category:[{required:true,message:"Please select a Category"}],
    amount:[{required:true,message:"Please enter Amount"},
      {pattren:/^[1-9]\d*(\.\d+)?$/,message:"Please enter a valid Number"}
    ],
    // email:[{required:true,message:"Please enter a Email"},
    //   {pattren:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"Please enter a valid Email"}
    // ]

  }

  const validate=(formData)=>{
    const errorData={}

    Object.entries(formData).forEach(([key,value])=>{
      validateConfig[key].some((rule)=>{
      if(rule.required && !value){
        errorData[key]=rule.message
        return true
      }
      if(rule.minLength && value.length<5){
        errorData[key]=rule.message
        return true
      }
      if(rule.type === Number && isNaN(value)){
        errorData[key]=rule.message
        return true
      }
      if(rule.pattren && !rule.pattren.test(value)){
        errorData[key]=rule.message
        return true
      }
      })
    })


    // if(!formData.title){
    //   errorData.title="Title is required"
    // }

    // if(!formData.category){
    //   errorData.category="Please select a Category"
    // }

    // if(!formData.amount){
    //   errorData.amount="Amount is required"
    // }
    setError(errorData)
    return errorData
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
   // Validate the expense
    const validateResult=validate(expensee)
    // If validation fails, exit early
    if(Object.keys(validateResult).length) return
    //This is the functionality to edit and update expense
    if(editingRowId){
      setExpenses((previousState)=>
        previousState.map((previousExpense)=>{
          if(previousExpense.id===editingRowId){
            return {...expensee,id:editingRowId}
          }
          return previousExpense
        })
      )
      setExpensee({
        title: '',
        category: '',
        amount: '',
      })
      setEditingRowId('')
      return
    }
    // Add the expense with a new unique ID
    setExpenses((prevState) => [
      ...prevState,
      { ...expensee,id: crypto.randomUUID() },
    ])
    setExpensee({
      title: '',
      category: '',
      amount: '',
    })
  }

const handleChange=(e)=>{
    const {name,value}=e.target
    setExpensee((prevState)=>({
        ...prevState,
        [name]:value,
    }))
    setError({})
}

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
          <Input 
          label="Title"
          id="title"
          name="title"
          value={expensee.title}
          onChange={handleChange}
          error={error.title}
          />
          <Select 
          label="Category"
          id="category"
          name="category"
          value={expensee.category}
          onChange={handleChange}
          options={['Grocery','Clothes','Bills','Education','Medicine']}
          defaultOption="Select Category"
          error={error.category}
          />
          <Input 
          label="Amount"
          id="amount"
          name="amount"
          value={expensee.amount}
          onChange={handleChange}
          error={error.amount}
          />
          {/* <Input 
          label="Email"
          id="email"
          name="email"
          value={expensee.email}
          onChange={handleChange}
          error={error.email}
          /> */}
          <button className="add-btn">{editingRowId?"Save Changes":"Add"}</button>
        </form>
  )
}
