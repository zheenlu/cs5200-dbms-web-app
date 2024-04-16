import React, { useState } from 'react';

function SetNewGoals() {
    // State to keep track of the goal's attributes
    const [goalName, setGoalName] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [learningResource, setLearningResource] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Not Started'); // Default status
    const [category, setCategory] = useState('Health & Wellness');
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newGoal = {
            goalName,
            goalDescription,
            learningResource,
            endDate,
            status,
            category
        };
        // Handle the new goal object (send to API or state management)
        console.log(newGoal);
    }

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
        </div>
    );
}

export default SetNewGoals;
