import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export const setNewGoal = async (userId, goalData) => {
    try {
        const response = await axios.post(`${API_BASE}/api/users/${userId}/goals`, goalData);
        return response.data;
    } catch (error) {
        console.error('Error setting new goal:', error);
        throw new Error('Failed to set new goal');
    }
};

export const getAllGoals = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE}/api/users/${userId}/goals`);
        return response.data;
    } catch (error) {
        console.error('Error fetching goals:', error);
        throw new Error('Failed to fetch goals');
    }
};

export const deleteGoal = async (userId, goalId) => {
    try {
        const response = await axios.delete(`${API_BASE}/api/users/${userId}/goals/${goalId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting goal:', error);
        throw new Error('Failed to delete goal');
    }
};

export const updateGoal = async (userId, goalId, goalData) => {
    try {
        const response = await axios.put(`${API_BASE}/api/users/${userId}/goals/${goalId}`, goalData);
        return response.data;
    } catch (error) {
        console.error('Error updating goal:', error);
        throw new Error('Failed to update goal');
    }
};
