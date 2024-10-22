import React, { useState,useEffect} from 'react';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdatePopup from './UpdatePopup';
import axios from 'axios';
function TaskForm() {
    const id =sessionStorage.getItem('id');
    
    const [input, setInput] = useState({ title: "", body: "" });
    const [array, setArray] = useState([]);
    
    
    const [showUpdatePopup, setShowUpdatePopup] = useState(false); // New state for popup visibility
    const [currentIndex, setCurrentIndex] = useState(null); // To track which task is being updated

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submit = async() => {
        if (input.title === "" || input.body === "") {
            toast.error("Empty Fields");
        } else {
            if(id){
                await axios.post(`http://localhost:3000/api/list/addtask`,{title:input.title,body:input.body,id:id }).then((Response)=>{
                    console.log(Response);
                    
                })
                
                setInput({ title: "", body: "" });
                toast.success("Task Added");
            }
            
            if(!id){
                toast.error("Added but not SAVED! Please Signup");
            }
            
        }
    };

    const del = async (cardid) => {
        try {
            const userId = id;  // Retrieve user ID from session storage
        
    
            // // Call the backend delete API
             await axios.delete(`${window.location.origin}/api/list/deletetask/${cardid}/${userId}`).then((response) => {
               console.log(response.data);
             });
    
             // Re-fetch tasks after deletion
             await fetchTasks();
    
             toast.success("Task deleted");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Error deleting task");
        }
    };
    
    
    // Function to fetch all tasks
    const fetchTasks = async () => {
        const response = await axios.get(`${window.location.origin}/api/list/showAllTask/${id}`);
        setArray(response.data);
    };
    
    


    const handleUpdate = (index) => {
        setCurrentIndex(index);
        setInput(array[index]); // Populate input fields with the current task's data
        setShowUpdatePopup(true); // Show the popup
    };
    useEffect(() => {
        const fetch =async() =>{
          await axios.get(`${window.location.origin}/api/list/showAllTask/${id}`).then((response)=>{
              setArray(response.data);
              
          })
  
        }
        fetch();
      
        
      }, [submit])

    return (
        <div className='todo'>
            <ToastContainer />
            <div className='ADD-FORM flex justify-center m-4'>
                <form className='flex flex-col w-1/2 p-5 rounded-lg shadow-lg items-center'>
                    <h2 className='text-gray-500 text-3xl font-mono'>Create new TODO</h2>
                    <input
                        className='border-2 border-gray-500 rounded-sm p-2 mt-6 mb-4 w-1/2 m-2 hover:scale-105'
                        type="text"
                        name='title'
                        required
                        placeholder='Title'
                        onChange={change}
                        value={input.title}
                    />
                    <textarea
                        className='border-2 border-gray-500 rounded-sm p-2 w-1/2 hover:scale-105'
                        name='body'
                        required
                        placeholder='Description'
                        onChange={change}
                        value={input.body}
                    />
                    <input
                        className='bg-orange-400 m-2 p-2 rounded-lg font-medium w-1/6 hover:scale-105'
                        type="button"
                        value="Submit"
                        onClick={submit}
                    />
                </form>
            </div>
            <div className="todo_List">
                <div className="grid grid-cols-3 gap-4 p-4">
                    {array.map((item, index) => (
                        <TodoCards
                            key={index}
                            id={item._id}
                            title={item.title}
                            body={item.body}
                            delid={del}
                            onUpdate={() => handleUpdate(index)} // Pass the update handler
                        />
                    ))}
                </div>
            </div>
            {showUpdatePopup && ( // Conditionally render the popup
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50'>
                    <UpdatePopup 
                        input={input}
                        setInput={setInput}
                        setShowUpdatePopup={setShowUpdatePopup}
                        array={array}
                        setArray={setArray}
                        currentIndex={currentIndex}
                    />
                </div>
            )}
        </div>
    );
}

export default TaskForm;
