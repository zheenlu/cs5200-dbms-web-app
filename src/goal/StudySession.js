import React from 'react';
import { Link } from 'react-router-dom';


function StudySession() {
  return (
    <div>
      <h1>Study Session</h1>

      <Link to="/home" className="button">Go back</Link>
    </div>
  );
}

export default StudySession;