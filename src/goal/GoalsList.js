import React, { useState, useEffect } from 'react';
import { getAllGoals, deleteGoal } from './client';
import { useAuth } from '../users/AuthContext';  // Make sure your Auth context provides userId
import { Link } from 'react-router-dom';

function GoalsList() {
    const { user } = useAuth();  // Assuming user object contains userId
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (user && user.id) {
            fetchGoals();
        }
    }, [user]);

    const fetchGoals = async () => {
        try {
            const fetchedGoals = await getAllGoals(user.id);
            setGoals(fetchedGoals);
        } catch (error) {
            console.error("Error fetching goals:", error);
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
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>
                        {goal.name} - <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/home" className="button">Go back</Link>
        </div>
    );
}

export default GoalsList;
