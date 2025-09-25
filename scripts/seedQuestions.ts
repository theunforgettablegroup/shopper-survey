import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

// Load env variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const questions = [
  {
    text: 'Rate Your Enjoyment in Shopping Online',
    answers: [
      'I love shopping online',
      'I like shopping online',
      "I don't have a strong opinion one way or the other",
      'I dislike shopping online',
    ],
  },
  {
    text: 'Which Choice Best Describes You?',
    answers: [
      'I do a lot of research before I buy',
      'I buy based on expert recommendation, reviews or a friend.',
      'I am swayed by influencers, videos and social media.',
      'I know what I like, and I buy.',
    ],
  },
  {
    text: 'When Planning A Party I',
    answers: [
      'Buy everything and a little extra just to be safe.',
      'Buy the bare minimum.',
      'I like to get creative, find great bargains, and usually buy too much.',
    ],
  },
  {
    text: 'I Shop This Way',
    answers: [
      'I shop on a budget, sometimes you just need those shoes.',
      'I am willing to spend, but I want to make sure I am making the right decision.',
      'I just shop and ask for forgiveness later.',
      'Money is no object.',
    ],
  },
  {
    text: 'I Enjoy Shopping',
    answers: ['By myself.', 'With others.', 'Would enjoy a personal shopper.'],
  },
  {
    text: 'I Wish All Shopping Was Like This',
    answers: [
      'I wish I could shop with friends online.',
      'I wish everything I needed was in one place and organized.',
      'I wish I could see how it fits, sounds and works.',
      'I wish I knew and could trust the products I buy online.',
    ],
  },
];

async function seed() {
  for (const q of questions) {
    // Insert question
    const { data: question, error: qError } = await supabase
      .from('questions')
      .insert({ question_text: q.text })
      .select()
      .single();

    if (qError) {
      console.error('Error inserting question:', q.text, qError.message);
      continue;
    }

    // Insert answers
    for (const answerText of q.answers) {
      const { error: aError } = await supabase
        .from('answers')
        .insert({ question_id: question.id, answer_text: answerText });

      if (aError) {
        console.error('Error inserting answer:', answerText, aError.message);
      }
    }
    console.log(`Seeded: ${q.text}`);
  }
  console.log('Seeding complete!');
}

seed();
