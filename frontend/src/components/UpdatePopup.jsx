import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdatePopup = ({ input, setInput, setShowUpdatePopup, array, setArray, currentIndex }) => {
    const handleUpdate = (index) => {
        setCurrentIndex(index);
        setInput({ title: array[index].title, body: array[index].body }); // Populate input fields with the current task's data
        setShowUpdatePopup(true); // Show the popup
    };
    
    const handleUpdateSubmit = async () => {
        try {
            const userId = sessionStorage.getItem('id'); // Get user ID from session storage
            const response = await axios.put(`${window.location.origin}/api/list/updatetask/${array[currentIndex]._id}/${userId}`, input);
            toast.success(response.data.message);

            // Update the local state to reflect the changes
            const updatedTasks = [...array];
            updatedTasks[currentIndex] = { ...updatedTasks[currentIndex], ...input }; // Update the task in the array
            setArray(updatedTasks);
            setShowUpdatePopup(false); // Close the popup
            setInput({ title: "", body: "" }); // Reset input fields
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Error updating task");
        }
    };

    return (
        <div className='bg-white p-5 rounded-lg shadow-lg'>
            <h2 className='text-gray-500 text-2xl mb-4'>Update Task</h2>
            <input
                type='text'
                className='border-2 border-gray-500 rounded-sm p-2 w-full mb-4'
                placeholder='Title'
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
            />
            <textarea
                className='border-2 border-gray-500 rounded-sm p-2 w-full mb-4'
                placeholder='Description'
                value={input.body}
                onChange={(e) => setInput({ ...input, body: e.target.value })}
            />
            <button className='bg-orange-400 p-2 rounded-lg' onClick={handleUpdateSubmit}>
                Update
            </button>
            <button className='bg-red-400 p-2 rounded-lg' onClick={() => setShowUpdatePopup(false)}>
                Cancel
            </button>
        </div>
    );
};

export default UpdatePopup;
