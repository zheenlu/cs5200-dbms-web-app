import React, { useState, useEffect } from 'react';
import { addStudySession, fetchStudySessions } from './client';
import { useAuth } from '../users/AuthContext';
import { Link } from 'react-router-dom';

function StudySession() {
    const { user } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({
        start_time: '',
        end_time: '',
        session_length: '60',
        goal_for_session: ''
    });

    useEffect(() => {
        if (user && user.id) {
            fetchStudySessions(user.id).then(setSessions);
        }
    }, [user]);

    const handleAddSession = async (event) => {
        event.preventDefault();
        if (user && user.id) {
            await addStudySession(user.id, newSession);
            setNewSession({
                start_time: '',
                end_time: '',
                session_length: '60',
                goal_for_session: ''
            });
            fetchStudySessions(user.id).then(setSessions);
        }
    };

    return (
        <div>
            <h1>Study Sessions</h1>
            <form onSubmit={handleAddSession}>
                <input type="datetime-local" value={newSession.start_time} onChange={e => setNewSession({ ...newSession, start_time: e.target.value })} required />
                <input type="datetime-local" value={newSession.end_time} onChange={e => setNewSession({ ...newSession, end_time: e.target.value })} required />
                <select value={newSession.session_length} onChange={e => setNewSession({ ...newSession, session_length: e.target.value })}>
                    <option value="25">25 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                </select>
                <input type="text" value={newSession.goal_for_session} placeholder="Goal for session" onChange={e => setNewSession({ ...newSession, goal_for_session: e.target.value })} required />
                <button type="submit">Add Session</button>
            </form>
            <div>
                {sessions.map(session => (
                    <div key={session.id}>
                        <p>Start: {session.start_time}, End: {session.end_time}, Length: {session.session_length} minutes, Goal: {session.goal_for_session}</p>
                    </div>
                ))}
            </div>
            <Link to="/home" className="button">Go back</Link>
        </div>
    );
}

export default StudySession;
