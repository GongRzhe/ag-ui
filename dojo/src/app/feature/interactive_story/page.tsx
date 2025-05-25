import React, { useState } from 'react';
import "./style.css"; // Import the stylesheet

const InteractiveStory = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [choices, setChoices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt) return;
    setLoading(true);
    setStory('');
    setChoices([]);

    // Simulate API call to generate story
    await new Promise(resolve => setTimeout(resolve, 1000));
    const generatedStory = `This is the beginning of a story based on your prompt: "${prompt}".`;
    const generatedChoices = ['Choice 1', 'Choice 2', 'Choice 3'];

    setStory(generatedStory);
    setChoices(generatedChoices);
    setLoading(false);
  };

  const handleChoice = async (choice: string) => {
    setLoading(true);
    // Simulate API call to generate next part of the story
    await new Promise(resolve => setTimeout(resolve, 1000));
    const nextStoryPart = `You chose "${choice}". The story continues...`;
    const nextChoices = [`Next Choice A for ${choice}`, `Next Choice B for ${choice}`];

    setStory(prevStory => `${prevStory}\n\n${nextStoryPart}`);
    setChoices(nextChoices);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Interactive Story Generator</h1>
      <div className="input-area">
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your initial prompt"
          disabled={loading}
        />
        <button onClick={handleSubmit} disabled={loading || !prompt}>
          {loading ? 'Generating...' : 'Generate Story'}
        </button>
      </div>

      {story && (
        <div className="story-display">
          <h2>Story</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{story}</p>
        </div>
      )}

      {choices.length > 0 && !loading && (
        <div className="choices-area">
          <h2>Choose your next action:</h2>
          {choices.map((choice, index) => (
            <button key={index} onClick={() => handleChoice(choice)} disabled={loading}>
              {choice}
            </button>
          ))}
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InteractiveStory;
