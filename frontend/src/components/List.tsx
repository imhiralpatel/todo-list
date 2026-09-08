import { useEffect, useState } from "react";
import '../style/list.css'

interface Task {
    Title: string;
    Description: string;
    CreatedAt : string
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

    const getListData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/todos");

            const list: ApiResponse = await response.json();

            if (list.success) {
                setTaskData(list.data);
                console.log(list.data);
                
            }
        } 
        catch (error) {
            console.log("Error fetching tasks:", error);
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
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {taskData.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.Title}</td>
                            <td>{item.Description}</td>
                            <td>{item.CreatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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