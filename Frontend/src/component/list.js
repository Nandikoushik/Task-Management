import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalTasks, setTotalTasks] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:9000/tasks?page=${page}&limit=${limit}`)
            .then((response) => {
                setTasks(response.data);
                setTotalTasks(100);
            })
            .catch((error) => console.error('Error fetching tasks:', error));
    }, [page, limit]);

    const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            axios.delete(`http://localhost:9000/tasks/${id}`)
                .then(() => setTasks(tasks.filter((task) => task._id !== id)))
                .catch((error) => console.error('Error deleting task:', error));
        }
    };

    const totalPages = Math.ceil(totalTasks / limit);

    if(!tasks || tasks?.length === 0) {
        return <div style={{ padding: '20px' }}>No tasks found. Please add some tasks.</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Title</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Description</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks?.map((task) => (
                                <tr key={task._id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '12px' }}>{task.title}</td>
                                    <td style={{ padding: '12px' }}>{task.description}</td>
                                    <td style={{ padding: '12px' }}>{task.status}</td>
                                    <td style={{ padding: '12px' }}>
                                        <Link to={`/edit/${task._id}`}>
                                            <button className='btn btn-primary' style={{ marginRight: '8px' }}>Edit</button>
                                        </Link>
                                        <button className='btn btn-danger' onClick={() => onDelete(task._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <label>Items per page: </label>
                            <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        
                        <div>
                            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                            <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
                            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
                        </div>
                    </div>
        </div>
    );
}

export default TaskList;