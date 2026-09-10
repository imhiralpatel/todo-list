import { useState } from 'react';
import '../style/addtask.css'
import { useNavigate } from 'react-router-dom';

function AddTask() {
    const [taskData, setTaskData] = useState({
        title: '',
        description: ''
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleAddTask = async () => {
        console.log(taskData);
        let result = await fetch("http://localhost:5000/api/todos", {
            method: 'post',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'Application/Json'
            }
        })
        result = await result.json();
        if (result) {
            setMessage('Task Added Successfully!');

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            setMessage('Task add nahi hua');
        }
    }

    return (
        <div className="container">
            <h1>
                Add New Task
            </h1>

            <label htmlFor="">Title</label>
            <input onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} 
            type="text" name="title" placeholder="Enter task title" autoComplete="new-password" />
            <label htmlFor="">Description</label>
            <textarea onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} 
            name="description" placeholder="Enter task description" rows={5} autoComplete="new-password"></textarea>
            <button className="submit" onClick={handleAddTask}>Add New Task</button>

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}
        </div>
    )
}

export default AddTask;