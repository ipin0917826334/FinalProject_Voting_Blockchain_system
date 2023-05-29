import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateVote = ({ addVoteTopic, topics }) => {
  const [candidate, setCandidate] = useState('');
  const [image, setImage] = useState('');
  const [ballotType, setBallotType] = useState('');
  const [choices, setChoices] = useState(['']); // State for choices
  const navigate = useNavigate();

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCandidate = {
      name: candidate,
      image,
      ballotType,
      choices: ballotType === 'single' ? ['Yes', 'No'] : choices.filter((choice) => choice !== ''),
    };
    addVoteTopic({ topic: candidate, candidates: [newCandidate], ballotType });
    setCandidate('');
    setImage('');
    setBallotType('');
    setChoices(['']);
    navigate(`/vote/${topics.length}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="candidate" className="text-lg font-semibold">
          Candidate Name:
        </label>
        <input
          type="text"
          id="candidate"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          placeholder="Enter candidate name"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
        />
      </div>
      <div>
        <label htmlFor="image" className="text-lg font-semibold">
          Candidate Image URL:
        </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter candidate image URL"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
        />
      </div>
      <div>
        <label htmlFor="ballotType" className="text-lg font-semibold">
          Ballot Type:
        </label>
        <select
          id="ballotType"
          value={ballotType}
          onChange={(e) => setBallotType(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
        >
          <option value="">Select ballot type</option>
          <option value="single">Single choice</option>
          <option value="multiple">Multiple choice</option>
        </select>
      </div>
      {ballotType === 'multiple' && (
        <div>
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center space-x-2 mt-3 mb-3">
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                placeholder="Enter choice"
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddChoice}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-300"
          >
            Add Another Choice
          </button>
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-300"
      >
        Create Vote
      </button>
    </form>
  );
};

export default CreateVote;
