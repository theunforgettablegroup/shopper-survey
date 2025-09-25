-- Table to store possible answers for each question
CREATE TABLE IF NOT EXISTS public.answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL
);