import React, { useState } from 'react'
import ContextMenu from "./ContextMenu"
import { useFilter } from '../hooks/useFilter'

export default function ExpenseTable({expenses,setExpense,setExpensee,setEditingRowId}) {
  //WITHOUT CUSTOM METHOD OF FILTER DATA OF EACH CATEGORY
  // const [category,setCategory]=useState('')
  // const filteredData=expenses.filter((expense)=> {
  //   return expense.category.toLowerCase().includes(category)
  // })
  //CUSTOM HOOK METHOD OF FILTER DATA 
  const[filteredData,setQuery]=useFilter(expenses,(data)=>data.category)
  //CALCULATE TOTAL OF AMOUNTS IN THE TABLE
  const totalOfAmounts=filteredData.reduce((accumulator,current)=>accumulator+parseInt(current.amount),0
  )
  //APPLY CONTEXT MENU 
  const [menuPositin,setMenuPosition]=useState({})
  const[rowId,setRowId]=useState('')
  //Sort data
  const [sortCallback,setSortCallback]=useState(()=>()=>{})
  return (
    <>
    <ContextMenu  
    menuPositin={menuPositin} 
    setMenuPosition={setMenuPosition} 
    setExpense={setExpense} 
    rowId={rowId} 
    setExpensee={setExpensee} 
    expenses={expenses}
    setEditingRowId={setEditingRowId}
    />
    <table className="expense-table" onClick={()=>{
      if(menuPositin.left){
        setMenuPosition({})
      }
    }}>
          <thead>
            <tr>
            <th className="amount-column">
                <div>
                  <span>Title</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow up-arrow"
                    onClick={()=>{
                      //sort alphabateicaly
                      setSortCallback(()=>(a,b)=>a.title.localeCompare(b.title))
                    }}
                  >
                    <title>Ascending</title>
                    <path
                      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow down-arrow"
                    onClick={()=>{
                        setSortCallback(()=>(a,b)=>b.title.localeCompare(a.title))
                    }}
                  >
                    <title>Descending</title>
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </div>
              </th>
              <th>
              {/* WITHOUT CUSTOM METHOD OF FILTER DATA OF EACH CATEGORY */}
              {/* <select onChange={(e)=>setCategory(e.target.value.toLowerCase())}> */}
              {/*  CUSTOM METHOD OF FILTER DATA OF EACH CATEGORY */}
                <select onChange={(e)=>setQuery(e.target.value.toLowerCase())}>
                  <option value="">All</option>
                  <option value="grocery">Grocery</option>
                  <option value="clothes">Clothes</option>
                  <option value="bills">Bills</option>
                  <option value="education">Education</option>
                  <option value="medicine">Medicine</option>
                </select>
              </th>
              <th className="amount-column">
                <div>
                  <span>Amount</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow up-arrow"
                    onClick={()=>{
                      //old method sort
                      // setExpense((prevState)=>[...prevState.sort((a,b)=>a.amount-b.amount)])
                      //new method sort
                      setSortCallback(()=>(a,b)=>a.amount-b.amount)
                    }}
                  >
                    <title>Ascending</title>
                    <path
                      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 384 512"
                    className="arrow down-arrow"
                    onClick={()=>{
                      //old method sort
                      // setExpense((prevState)=>[...prevState.sort((a,b)=>b.amount-a.amount)])
                      //new method sort
                      setSortCallback(()=>(a,b)=>b.amount-a.amount)
                    }}
                  >
                    <title>Descending</title>
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* after filter functionality BUT without custom hook */}
            {filteredData.sort(sortCallback).map(({id,title,category,amount})=>(
            <tr key={id} onContextMenu={(e)=>{
              e.preventDefault()
              setMenuPosition({left:e.clientX + 6,top:e.clientY + 6})
              setRowId(id)
            }}>
              <td>{title}</td>
              <td>{category}</td>
              <td>₹{amount}</td>
            </tr>
        ))}

            {/* before filter functionality */}
            {/* {expenses.map(({id,title,category,amount})=>(
            <tr key={id}>
              <td>{title}</td>
              <td>{category}</td>
              <td>₹{amount}</td>
            </tr>
        ))} */}
            <tr>
              <th>Total</th>
              <th className='clear-sort'
              onClick={()=>{
                setSortCallback(()=>()=>{})
              }}
              >Clear Sort</th>
              <th>₹{totalOfAmounts}</th>
            </tr>
          </tbody>
        </table>
        </>
  )
}
