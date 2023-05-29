import React from 'react';
import { Link } from 'react-router-dom';

const VoteTopic = ({ topics , location }) => {
  return (
    <div className="p-4">
      {topics.map((topic, index) => (
        <Link to={`/vote/${index}`} key={index} className="block border-b border-gray-200 p-2">
          {topic.topic}
        </Link>
      ))}
    </div>
  );
};

export default VoteTopic;
