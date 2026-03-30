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
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-group'>
                <input 
                    type='text' 
                    placeholder='Add Task Title' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>
            <div className='form-group'>
                <textarea 
                    placeholder='Add Task Description' 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                    rows='4'
                />
            </div>
            {error && <div className='error-message'>{error}</div>}
            <button 
                type='submit' 
                className='btn btn-block'
                disabled={loading}
            >
                {loading ? 'Saving...' : 'Save Task'}
            </button>
        </form>
    )
}   

export default AddTask