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
                const response = await fetch(`http://localhost:9000/tasks/${id}`);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!task) return <div>Task not found</div>;

    return (
        <div className='task'>
            <h3>{task.text}</h3>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
        </div>
    );
};

export default ViewTask;