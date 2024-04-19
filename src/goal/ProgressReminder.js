import React, { useEffect, useState } from 'react';
import { fetchGoalsWithDaysLeft } from './client';
import { Link } from 'react-router-dom';
import { useAuth } from '../users/AuthContext'; 

function ProgressReminder() {
    const [goals, setGoals] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        async function loadGoals() {
            if (user && user.id) {
                const goalsData = await fetchGoalsWithDaysLeft(user.id);
                setGoals(goalsData);
            }
        }
        loadGoals();
    }, [user]);

    return (
        <div>
            <h1>Progress Reminders</h1>
            {goals.length > 0 ? (
                goals.map(goal => (
                    <div key={goal.id}>
                        <p>{goal.name} - Days left: {goal.days_left}</p>
                    </div>
                ))
            ) : (
                <p>No goals to display.</p>
            )}
            <Link to="/home" className="button">Go back</Link>
        </div>
    );
}

export default ProgressReminder;
