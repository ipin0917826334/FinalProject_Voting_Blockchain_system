import React from 'react';

const Result = ({ results }) => {
  return (
    <div className="p-4">
      {results.map((result, index) => (
        <div key={index} className="border-b border-gray-200 p-2">
          {result.topic}: {result.votes}
        </div>
      ))}
    </div>
  );
};

export default Result;
