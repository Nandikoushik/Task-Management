import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const [title, setTitle] = useState('')
     const navigate = useNavigate();
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        
        if (!title.trim()) {
            setError('Title is required')
            return
        }

        setLoading(true)
        setError('')
        
        try {
            await axios.post('http://localhost:9000/tasks', { title, description })
            setTitle('')
            setDescription('')
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add task')
        } finally {
            setLoading(false)
        }
    }   
    
    return (
        <form 
            className='add-form' 
            onSubmit={onSubmit}
            style={{
                maxWidth: '100%',
                margin: '0 auto',
                padding: '1rem',
                '@media (maxWidth: 768px)': {
                    padding: '0.5rem'
                }
            }}
        >
            <div 
                className='form-group'
                style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <input 
                    type='text' 
                    placeholder='Add Task Title' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    required
                    style={{
                        padding: '0.75rem',
                        fontSize: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontFamily: 'inherit',
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                />
            </div>
            <div 
                className='form-group'
                style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <textarea 
                    placeholder='Add Task Description' 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                    rows='4'
                    style={{
                        padding: '0.75rem',
                        fontSize: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontFamily: 'inherit',
                        width: '100%',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        minHeight: '120px'
                    }}
                />
            </div>
            {error && (
                <div 
                    className='error-message'
                    style={{
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        backgroundColor: '#fee',
                        color: '#c33',
                        borderRadius: '4px',
                        fontSize: '0.9rem'
                    }}
                >
                    {error}
                </div>
            )}
            <button 
                type='submit' 
                className='btn btn-block'
                disabled={loading}
                style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    width: '100%',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                }}
            >
                {loading ? 'Saving...' : 'Save Task'}
            </button>
        </form>
    )
}   

export default AddTask