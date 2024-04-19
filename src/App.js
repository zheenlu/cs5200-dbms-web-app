import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./users/Register";
import Login from './users/Login'
import Account from './users/Account'
import Home from './home';
import SetNewGoals from './goal/SetNewGoals';
import GoalsCompleted from './goal/GoalsCompleted';
import GoalsInProgress from './goal/GoalsInProgress';
import GoalsInStore from './goal/GoalsInStore';
import StudySession from './goal/StudySession';
import { AuthProvider } from './users/AuthContext';



function App() {
  return (
    <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="*" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/home" element={<Home />} />
              <Route path="/set-new-goals" element={<SetNewGoals />} />
              <Route path="/goals-in-progress" element={<GoalsInProgress />} />
              <Route path="/goals-completed" element={<GoalsCompleted />} />
              <Route path="/goals-in-store" element={<GoalsInStore />} />
              <Route path="/study-session" element={<StudySession />} />
            </Routes>
          </div>
        </Router>
    </AuthProvider>

  );
}


export default App;