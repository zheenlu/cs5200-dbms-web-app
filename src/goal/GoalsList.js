import React, { useState, useEffect } from 'react';
import { getAllGoals, deleteGoal, updateGoal } from './client';
import { useAuth } from '../users/AuthContext';
import { Link } from 'react-router-dom';

function GoalsList() {
    const { user } = useAuth();  // Assuming user object contains userId
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
        setEditFormData(goal);
    };

    const handleFormChange = (event) => {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        });
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        // Simple validation example
        if (!editFormData.name || !editFormData.description || !editFormData.end_date || !editFormData.status || !editFormData.category_id) {
            alert("All fields must be filled out.");
            return;
        }
        try {
            await updateGoal(user.id, editingGoalId, editFormData);
            setEditingGoalId(null);
            fetchGoals();
        } catch (error) {
            console.error('Failed to update goal:', error);
        }
    };
    
    

    return (
        <div>
            <h1>Your Goals</h1>
            {goals.map((goal) => (
                <div key={goal.id}>
                    {editingGoalId === goal.id ? (
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                name="name"
                                value={editFormData.name}
                                onChange={handleFormChange}
                                required
                            />
                            <textarea
                                name="description"
                                value={editFormData.description}
                                onChange={handleFormChange}
                                required
                            />
                            <input
                                type="date"
                                name="end_date"
                                value={editFormData.end_date}
                                onChange={handleFormChange}
                                required
                            />
                            <select
                                name="status"
                                value={editFormData.status}
                                onChange={handleFormChange}
                                required
                            >
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <button type="submit">Update</button>
                        </form>
                    ) : (
                        <div>
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
