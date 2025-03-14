import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import ExpenseData from './ExpenseData'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [expensee, setExpensee] = useLocalStorage('expensee',{
      title: '',
      category: '',
      amount: '',
      // email:'',
    })
  const [expense, setExpense] = useLocalStorage('expense',ExpenseData)
  const [editingRowId,setEditingRowId]=useLocalStorage('editngRowId','')
  //for practice and understanding of localstorage custom hook working
  // const [localData,setLocalData]=useLocalStorage('Num',[1,2,3])

  return (
    <main>
      {/* for practice and understanding of localstorage custom hook working */}
      {/* <h1 onClick={()=>{
        setLocalData((prevState)=>[...prevState,4,5,6])
      }}>Track Your Expense</h1> */}
      {/* <h1>{localData}</h1> */}
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm setExpenses={setExpense} expensee={expensee} setExpensee={setExpensee} editingRowId={editingRowId} setEditingRowId={setEditingRowId}/>
        <ExpenseTable expenses={expense} setExpensee={setExpensee} setExpense={setExpense} setEditingRowId={setEditingRowId}/>
        
      </div>
    </main>   
  )
}

export default App
