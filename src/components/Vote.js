import React from 'react';
import { useParams } from 'react-router-dom';

const Vote = ({ topics, castVote }) => {
  const { topicId } = useParams();
  const topic = topics[topicId];

  const handleVote = (candidateId, choiceIndex) => {
    castVote(topicId, candidateId, choiceIndex);
  };

  const renderVoteButton = (candidateId) => {
    const candidate = topic.candidates[candidateId];
    if (topic.ballotType === 'single') {
      return (
        <div>
          {candidate.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleVote(candidateId, index)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 mr-2 mb-2"
            >
              {choice}
            </button>
          ))}
        </div>
      );
    } else if (topic.ballotType === 'multiple') {
      return (
        <div>
          {candidate.choices.map((choice, index) => (
            <label key={index} className="flex items-center space-x-2 mb-2 p-3 border border-gray-300 rounded-md">
              <input
                type="radio"
                name={`choice-${candidateId}`}
                onChange={() => handleVote(candidateId, index)}
                className="form-radio text-blue-500"
              />
              <span className="text-gray-800">{choice}</span>
            </label>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      {topic && topic.candidates ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic.candidates.map((candidate, index) => (
            <div key={index} className="border rounded-md p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Name: {candidate.name}</h3>
              <img src={candidate.image} alt={candidate.name} className="w-full h-48 object-cover mb-2" />
              <p className="text-gray-600">Ballot type: {candidate.ballotType}</p>
              {renderVoteButton(index)}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Vote;
