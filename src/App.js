import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateVote from './components/CreateVote';
import VoteTopic from './components/VoteTopic';
import Navbar from './components/Navbar';
import Vote from './components/Vote';
import Result from './components/Result';

const App = () => {
  const [topics, setTopics] = useState([]);
  const [results, setResults] = useState([]);

  const addVoteTopic = (newTopic) => {
    setTopics([...topics, newTopic]);
  };
  const castVote = (topicId, candidateId) => {
    setTopics(
      topics.map((topic, index) =>
        index === topicId
          ? {
              ...topic,
              candidates: topic.candidates.map((candidate, i) =>
                i === candidateId ? { ...candidate, votes: (candidate.votes || 0) + 1 } : candidate
              ),
            }
          : topic
      )
    );
  };
  

  return (
    <Router>
      <Navbar />
      <div className="flex">
        <div className="w-1/4 bg-gray-200 h-screen flex flex-col">
          <h2 className="p-4 font-bold">Voting Topics</h2>
          <VoteTopic topics={topics} />
          {/* <button onClick={() => addVoteTopic(prompt('Enter new topic'))} className="font-bold">
            Add New Topic
          </button> */}
        </div>
        <div className="w-3/4 p-4">
        <Routes>
            <Route path="/create" element={<CreateVote addVoteTopic={addVoteTopic} topics={topics}/>} />
            <Route path="/vote/:topicId" element={<Vote topics={topics} castVote={castVote} />} />
            <Route path="/results" element={<Result results={results} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
