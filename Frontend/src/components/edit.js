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

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '1rem',
    };

    const formStyle = {
        width: '100%',
        maxWidth: '500px',
        padding: '2rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
        boxSizing: 'border-box',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        fontSize: '0.95rem',
    };

    const selectStyle = {
        width: '100%',
        padding: '0.75rem',
        marginTop: '0.5rem',
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const errorStyle = {
        padding: '0.75rem',
        marginBottom: '1rem',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        borderRadius: '4px',
        border: '1px solid #f5c6cb',
    };

    return (
        <div style={containerStyle}>
            <form className='edit-form' onSubmit={onSubmit} style={formStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '1.5rem', textAlign: 'center', fontSize: 'clamp(1.25rem, 5vw, 1.75rem)' }}>Edit Task</h2>
                <input
                    type='text'
                    name='title'
                    placeholder='Task Title'
                    value={editedTask.title}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />
                <input
                    type='text'
                    name='description'
                    placeholder='Task Description'
                    value={editedTask.description}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <div>
                    <label style={labelStyle}>Status</label>
                    <select value={editedTask.status} onChange={handleChange} name='status' style={selectStyle}>
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                {error && <p style={errorStyle}>{error}</p>}
                <input
                    type='submit'
                    value={loading ? 'Updating...' : 'Update Task'}
                    className='btn btn-block'
                    style={buttonStyle}
                    disabled={loading}
                    onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#007bff')}
                />
            </form>
        </div>
    );
};

export default EditTask;
