import React from 'react'

export default function ContextMenu({menuPositin,setMenuPosition,setExpense,rowId,setExpensee,expenses,setEditingRowId}) {
  if(!menuPositin.left) return
  return (
    <div className="context-menu" style={{...menuPositin}}>
            <div onClick={()=>{
              const {title,category,amount}=expenses.find((expense)=>expense.id===rowId)
              setEditingRowId(rowId)
              setExpensee({title,category,amount})
              setMenuPosition({})
            }}>Edit</div>
            <div onClick={()=>{
              setExpense((previosuState)=>previosuState.filter((expense)=>expense.id!==rowId))
              setMenuPosition({})
            }}>Delete</div>
        </div>
  )
}
