import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:9000/tasks/details/${id}`);
                if (!response.ok) throw new Error('Failed to fetch task');
                const data = await response.json();
                setTask(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTask();
    }, [id]);

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Error: {error}</div>;
    if (!task) return <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Task not found</div>;

    return (
        <div className='task' style={{
            maxWidth: '600px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <p style={{ marginBottom: '10px', color: '#555' }}>
                <strong>Title:</strong> {task.title}
            </p>
            <p style={{ marginBottom: '10px', color: '#555' }}>
                <strong>Description:</strong> {task.description}
            </p>
            <p style={{ marginBottom: '10px', color: '#555' }}>
                <strong>Status:</strong> <span style={{
                    padding: '5px 10px',
                    borderRadius: '4px',
                    backgroundColor: task.status === 'completed' ? '#d4edda' : '#fff3cd',
                    color: task.status === 'completed' ? '#155724' : '#856404'
                }}>{task.status}</span>
            </p>
        </div>
    );
};

export default ViewTask;