import { useEffect, useState } from "react";
import '../style/list.css'
import { Link } from "react-router-dom";

interface Task {
    Id: number;
    Title: string;
    Description: string;
    IsCompleted: boolean;
    CreatedAt: string;
}

interface ApiResponse {
    success: boolean;
    data: Task[];
}

function List() {
    const [taskData, setTaskData] = useState<Task[]>([]);

    useEffect(() => {
        getListData();
    }, []);

    // Loading state
    const [loading, setLoading] = useState(false);

    const getListData = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/todos");

            const list: ApiResponse = await response.json();

            if (list.success) {
                setTaskData(list.data);
            }
        }
        catch (error) {
            console.log("Error fetching tasks:", error);
        }
        finally {
            setLoading(false);
        }
    };

    
    // =========================
    // DELETE SINGLE TODO
    // =========================

    const deleteTask = async (id: number) => {
        
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: 'delete'
            });

            const result = await response.json();

            if (result.success) {
                //// setTaskData(result.data);
                // UI se bhi remove kar do
                setTaskData((prev) =>
                    prev.filter((item) => item.Id !== id)
                );

                alert("Todo deleted successfully");
            }
            else {
                alert(result.message || "Delete failed");
            }
        }
        catch (error) {
            console.log("Error deleting tasks:", error);
        }
    };

    // =========================
    // DELETE ALL TODOS
    // =========================

    const handelDeleteAll = async () => {
        
        if (taskData.length === 0) {
            alert("No todos available");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/todos/`, {
                method: 'delete'
            });

            const result = await response.json();

            if (result.success) {

                // Saare todos UI se remove
                setTaskData([]);

                alert(
                    `${result.deletedCount} todos deleted successfully`
                );

            } else {

                alert(
                    result.message || "Delete all failed"
                );
            }
        }
        catch (error) {
            console.log("Error deleting tasks:", error);
            alert("Something went wrong");
        }
    };


    return (
        <div>
            <h1>To Do List</h1>

            <table>
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) 
                        : 
                        (
                            taskData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.Title}</td>
                                    <td>{item.Description}</td>
                                    <td>
                                        {item.IsCompleted
                                            ? "Completed"
                                            : "Pending"}
                                    </td>
                                    <td>{new Date(item.CreatedAt).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={"edit/" + item.Id} className="edit-item">Edit</Link>
                                        <button className="delete-item" onClick={() => deleteTask(item.Id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>

            <button className="delete-all" onClick={() => handelDeleteAll()}>Delete All</button>

            {/* <ul>
                <li>Sr.No. | Title | Description</li>

                {taskData.map((item, index) => (
                    <li key={index}>
                        {index + 1} | {item.title} | {item.description}
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default List;