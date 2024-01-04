import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrash  } from "react-icons/fa";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  const [editIndex, setEditIndex] = useState(-1)
  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot)=>{
      setTodos(snapshot.docs.map((doc)=>({id: doc.id, todo:doc.data().todo})))
    })
    return()=>unsubscribe();
  },[])
 const addTodo = async ()=>{
  try{
    if(input.trim() !== ''){
      // setTodos([...todos, {id: new Date(), todo: input}])
      await addDoc(collection(db,'todos'), {todo : input})
      setInput('')
    }

  }catch(err){
    console.error(err.message)
  }
 }
 const clickEdit = (index)=>{
  setInput(todos[index].todo)
  setEditIndex(index)

 }
 const clickDelete = async(id)=>{
  try{
    await deleteDoc(doc(db,'todos', id))

  }catch(err){
    console.log(err)
  }
 }
 const updateData =async ()=>{
  try{
    if(input.trim() !== ''){
      const todoDocRef = doc(db, 'todos', todos[editIndex].id)
      await updateDoc(todoDocRef, {todo: input});
      setInput('')
      setEditIndex(-1)
    }

  }catch(err){
    console.error(err.message)
  }

 }
  return (
    <>
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center p-4 bg-custom-background bg-center bg-cover ">
        <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>
          <div className="flex gap-2">
            <input type="text"
            value={input}
            placeholder="Add a todo"
            className="py-2 px-4 border rounded w-full focus:outline-none"
            onChange={(e)=>setInput(e.target.value)}
            />
            <button onClick={editIndex===-1 ? addTodo : updateData} className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded">
            {editIndex===-1 ? "+Add" : "Update"}
            </button>
          </div>
        </div>
        <div className="bg-gray-300 p-6 rounded shodow-md w-full max-w-lg lg:w-1/4">
          <ul>
            { todos.length>0 && (
              todos.map((data, index)=>
              <li key={index} className="flex items-center justify-between bg-white p-3 rounded shadow-md ">
              <span className="text-lg font-medium">{data.todo}</span>
              <div>
              <button onClick={()=>clickEdit(index)} className="mr-2 px-4 py-2 rounded text-white bg-gradient-to-r from-gray-400 to-black hover:from-gray-500 hover:to-gray-400 transition-duration: 300ms"><FaEdit/></button>
              <button onClick={()=>clickDelete(data.id)} className="px-4 py-2 rounded text-white bg-red-500 hover:to-gray-400 transition-duration: 300ms"><FaTrash /></button>
              </div>
            </li>
              ))
            }
          </ul>
        </div>

      </div>
    </>
  );
}

export default App;