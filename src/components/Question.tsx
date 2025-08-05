import React from 'react';

type QuestionProps = {
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
};

const Question: React.FC<QuestionProps> = ({ question, answers, onAnswer }) => (
  <div>
    <h2 style={{ fontSize: '1.2rem', color: '#222', marginBottom: '1rem', textAlign: 'center' }}>{question}</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {answers.map((answer) => (
        <button
          key={answer}
          onClick={() => onAnswer(answer)}
          style={{
            padding: '0.75rem 1.25rem',
            background: '#FFD600',
            color: '#222',
            border: 'none',
            borderRadius: '0.75rem',
            fontWeight: 600,
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {answer}
        </button>
      ))}
    </div>
  </div>
);

export default Question;