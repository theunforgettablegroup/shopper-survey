-- Table to store survey questions
CREATE TABLE IF NOT EXISTS public.questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);