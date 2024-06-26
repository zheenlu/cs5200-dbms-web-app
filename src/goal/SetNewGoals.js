import React, { useState } from 'react';
import * as client from './client';
import { useAuth } from '../users/AuthContext';
import { Link } from 'react-router-dom';

function SetNewGoals() {
    const { user } = useAuth(); 
    const [goalName, setGoalName] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [learningResource, setLearningResource] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Not Started');
    const [category, setCategory] = useState('Health & Wellness');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("You are not logged in or user ID is missing!");
            return;
        }
        const newGoal = {
            name: goalName,
            description: goalDescription,
            learningResource: learningResource, 
            endDate: endDate,
            status: status,
            category: category
        };
        console.log('User ID:', user.id);
        console.log('New Goal:', newGoal);
        try {
            const response = await client.setNewGoal(user.id, newGoal);
            console.log('Goal created successfully:', response);
        } catch (error) {
            console.error('Failed to create goal:', error);
        }
    };

    return (
        <div>
            <form className="auto-form-container" onSubmit={handleSubmit}>
                <label>
                    Goal Name:
                    <input
                        type="text"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={goalDescription}
                        onChange={(e) => setGoalDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Learning Resource (URL):
                    <input
                        type="url"
                        value={learningResource}
                        onChange={(e) => setLearningResource(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                <label>
                    Category:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Personal Development">Personal Development</option>
                        <option value="Career & Professional">Career & Professional</option>
                        <option value="Education">Education</option>
                        <option value="Hobbies & Leisure">Hobbies & Leisure</option>
                        <option value="Social & Family">Social & Family</option>
                    </select>
                </label>
                <button type="submit">Create Goal</button>
            </form>
            <Link to="/home" className="button">Go back</Link>
        </div>
    );
}

export default SetNewGoals;
