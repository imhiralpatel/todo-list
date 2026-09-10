import { useEffect, useState } from 'react';
import '../style/addtask.css'
import { useNavigate, useParams } from 'react-router-dom';

interface Task {
    Id: number;
    Title: string;
    Description: string;
    IsCompleted: boolean;
}

function EditTask() {
    const [taskData, setTaskData] = useState({
        Title: '',
        Description: '',
        IsCompleted: false
    });


    // =========================
    // SINGLE RECORD TODO
    // =========================

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getTask()
    }, [id])

    const getTask = async () => {
        if (!id) return;
        try {
            const response = await fetch(`http://localhost:5000/api/todos/${id}`);

            if (!response.ok) {
                throw new Error("Failed to fetch task");
            }

            const result: { success: boolean; data: Task } =
                await response.json();

            setTaskData(result.data);
            console.log(result.data);

        }
        catch (error) {
            console.error(error);
        }
    }

    // =========================
    // UPDATE TODO
    // =========================

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        if (id === null) {
            return;
        }

        if (!taskData?.Title.trim()) {
            alert("Title is required");
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/api/todos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Title: taskData.Title,
                        Description: taskData.Description,
                        IsCompleted: taskData.IsCompleted,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Update failed");
            }

            if (result.success) {
                setMessage('Task updated Successfully!');
                alert("Todo updated successfully");
                navigate("/");
            }
            else {
                setMessage('Task updated failed!');
                alert(
                    result.message || "Update failed"
                );
            }

        }
        catch (error) {
            console.log("Update error:", error);
            alert("Something went wrong");
        }
    };


    return (
        <div className="container">
            <h1>
                Edit Task
            </h1>

            <label>Title</label>
            <input onChange={(event) => setTaskData({ ...taskData, Title: event.target.value })}
                value={taskData.Title}
                type="text" name="title" autoComplete="new-password"
                placeholder="Enter task title" />
            <label>Description</label>
            <textarea
                onChange={(event) => setTaskData({ ...taskData, Description: event.target.value })}
                value={taskData?.Description ?? ""}
                name="description" autoComplete="new-password"
                placeholder="Enter task description" rows={5}>
            </textarea>
            <label>
                Completed
            </label>
            <input
                type="checkbox"
                checked={taskData?.IsCompleted ?? false}
                onChange={(e) =>
                    setTaskData((prev) =>
                        prev
                            ? { ...prev, IsCompleted: e.target.checked }
                            : prev
                    )
                }
                style={{ width: '100px' }}
            />


            <button className="submit" onClick={handleUpdate}>Edit Task</button>

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}
        </div>
    )
}

export default EditTask;