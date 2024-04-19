import React, { useState, useEffect } from 'react';
import { getAllGoals, deleteGoal, updateGoal } from './client';
import { useAuth } from '../users/AuthContext';
import { Link } from 'react-router-dom';

function GoalsList() {
    const { user } = useAuth();
    const [goals, setGoals] = useState([]);
    const [editingGoalId, setEditingGoalId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        if (user && user.id) {
            fetchGoals();
        }
    }, [user]);

    const fetchGoals = async () => {
        const fetchedGoals = await getAllGoals(user.id);
        setGoals(fetchedGoals);
    };

    const handleEdit = (goal) => {
        setEditingGoalId(goal.id);
        setEditFormData({
            name: goal.name,
            description: goal.description,
            start_date: goal.start_date,
            end_date: goal.end_date,
            status: goal.status,
            category_id: goal.category_id,
            resource_id: goal.resource_id 
        });
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = {
            name: editFormData.name || null,
            description: editFormData.description || null,
            start_date: editFormData.start_date || null,
            end_date: editFormData.end_date || null,
            status: editFormData.status || null,
            category_id: editFormData.category_id || null,
            resource_id: editFormData.resource_id || null,
        };
        try {
            await updateGoal(user.id, editingGoalId, formData);
            setEditingGoalId(null);
            fetchGoals();
        } catch (error) {
            console.error('Failed to update goal:', error);
        }
    };

    const handleDeleteGoal = async (goalId) => {
        try {
            await deleteGoal(user.id, goalId);
            fetchGoals();  // Refresh the list after deleting
        } catch (error) {
            console.error("Error deleting goal:", error);
        }
    };
    

    return (
        <div>
            <h1>Your Goals</h1>
            {goals.map((goal) => (
                <div key={goal.id}>
                    {editingGoalId === goal.id ? (
                        <form onSubmit={handleUpdate}>
                            <input type="text" name="name" value={editFormData.name} onChange={handleFormChange} required />
                            <textarea name="description" value={editFormData.description} onChange={handleFormChange} required />
                            <input type="date" name="start_date" value={editFormData.start_date} onChange={handleFormChange} required />
                            <input type="date" name="end_date" value={editFormData.end_date} onChange={handleFormChange} required />
                            <select name="status" value={editFormData.status} onChange={handleFormChange} required>
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <input
                                type="url"
                                name="resource_link"
                                value={editFormData.resource_link || ''}
                                onChange={handleFormChange}
                            />
    
                            <button type="submit">Update</button>
                        </form>
                    ) : (
                        <div>
                            <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
                            {goal.name} - <button onClick={() => handleEdit(goal)}>Edit</button>
                        </div>
                    )}
                </div>
            ))}
            <Link to="/home" className="button">Go back</Link>
        </div>
    );
}

export default GoalsList;
