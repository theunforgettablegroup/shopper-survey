-- Table to store each answer a user gave for a question
CREATE TABLE IF NOT EXISTS public.response_answers (
      id SERIAL PRIMARY KEY,
      response_id UUID REFERENCES responses(id) ON DELETE CASCADE,
      question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
      answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE
);