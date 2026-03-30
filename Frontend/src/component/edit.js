import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editedTask, setEditedTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/tasks/details/${id}`);
                setEditedTask(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.put(`http://localhost:9000/tasks/${id}`, editedTask);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!editedTask) return <p>Task not found</p>;

    return (
        <form className='edit-form' onSubmit={onSubmit}>
            <input
                type='text'
                name='title'
                value={editedTask.title}
                onChange={handleChange}
                required
            />
            <input
                type='text'
                name='description'
                value={editedTask.description}
                onChange={handleChange}
            />
            <input
                type='text'
                name='status'
                value={editedTask.status}
                onChange={handleChange}
            />
            {error && <p className='error'>{error}</p>}
            <input
                type='submit'
                value={loading ? 'Updating...' : 'Update Task'}
                className='btn btn-block'
                disabled={loading}
            />
        </form>
    );
};

export default EditTask;
