import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Question from '../components/Question';
import { createClient } from '../../supabase/client';
import { AnalyticsBanner } from '../components/AnalyticsBanner';

const supabase = createClient();

type Answer = {
  id: number;
  answer_text: string;
};

type Question = {
  id: number;
  question_text: string;
  answers: Answer[];
};

const mainColors = {
  yellow: '#FFD600',
  dark: '#222222',
  accent: '#F7B32B',
  white: '#FFFFFF',
};

const getShopperType = (responses: string[]) => {
  const [first, second, third, fourth, fifth, sixth] = responses;

  let glinda = 0;
  let hutch = 0;
  let lyon = 0;
  let tin = 0;
  let toto = 0;
  let dorothee = 0;
  let theda = 0;
  let amen = 0;

  if (first === 'I dislike shopping online') return 'Theda';
  else {
    if (second === 'I do a lot of research before I buy') {
      hutch++;
    } else if (second === 'I buy based on expert recommendation, reviews or a friend.') {
      lyon++;
    } else if (second === 'I am swayed by influencers, videos and social media.') {
      tin++;
    } else if (second === 'I know what I like, and I buy.') {
      toto++;
    }
    if (third === 'Buy everything and a little extra just to be safe.') {
      glinda++;
    } else if (third === 'Buy the bare minimum.') {
      theda++;
    } else if (third === 'I like to get creative, find great bargains, and usually buy too much.') {
      dorothee++;
    }
    if (fourth === 'I shop on a budget, sometimes you just need those shoes.') {
      dorothee++;
    } else if (
      fourth === 'I am willing to spend, but I want to make sure I am making the right decision.'
    ) {
      hutch++;
    } else if (fourth === 'I just shop and ask for forgiveness later.') {
      amen++;
      return 'Amen & Bow';
    } else if (fourth === 'Money is no object.') {
      glinda++;
    }
    if (fifth === 'By myself.') {
      tin++;
    } else if (fifth === 'With others.') {
      dorothee++;
      hutch++;
    } else if (fifth === 'Would enjoy a personal shopper.') {
      glinda++;
    }
    if (sixth === 'I wish I could shop with friends online.') {
      dorothee++;
    } else if (sixth === 'I wish everything I needed was in one place and organized.') {
      glinda++;
    } else if (sixth === 'I wish I could see how it fits, sounds and works.') {
      hutch++;
    } else if (sixth === 'I wish I knew and could trust the products I buy online.') {
      tin++;
    }

    // Determine the profile with the highest score
    const scores: Record<string, number> = {
      Glinda: glinda,
      Hutch: hutch,
      Lyon: lyon,
      Tin: tin,
      Toto: toto,
      Dorothee: dorothee,
      Theda: theda,
    };

    const maxScore = Math.max(...Object.values(scores));
    const topProfiles = Object.keys(scores).filter((profile) => scores[profile] === maxScore);

    // If there's a tie, return 'Dorothee' as default
    if (topProfiles.length === 1) {
      return topProfiles[0];
    } else {
      return 'Dorothee';
    }
  }
};

const Home: React.FC = () => {
  const router = useRouter();
  const [responses, setResponses] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responseId, setResponseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('id, question_text');

      if (questionsError) {
        console.error('Error fetching questions:', questionsError.message);
        setLoading(false);
        return;
      }

      const { data: answersData, error: answersError } = await supabase
        .from('answers')
        .select('id, question_id, answer_text');

      if (answersError) {
        console.error('Error fetching answers:', answersError.message);
        setLoading(false);
        return;
      }

      // Map answers to their questions
      const questionsWithAnswers = (questionsData || []).map((q) => ({
        ...q,
        answers: (answersData || []).filter((a) => a.question_id === q.id),
      }));

      setQuestions(questionsWithAnswers);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  // Create response row when survey starts
  useEffect(() => {
    if (!loading && questions.length && !responseId) {
      const createResponse = async () => {
        // Collect browser info in your React component
        const browserData = {
          userAgent: navigator.userAgent,
          screen: {
            width: window.screen.width,
            height: window.screen.height,
          },
          language: navigator.language,
          platform: navigator.platform,
          url: window.location.href,
        };
        // Optionally, fetch location from a public API
        const locationData = await fetch('https://ipapi.co/json/').then((res) => res.json());

        // Combine and send to your API or Supabase
        const userData = {
          ...browserData,
          location: locationData,
        };
        const { data, error } = await supabase
          .from('responses')
          .insert({ browser_info: userData, status: 'started' })
          .select('id')
          .single();
        if (data) setResponseId(data.id);
      };
      createResponse();
    }
  }, [loading, questions, responseId]);

  useEffect(() => {
    if (!responseId) return;

    const handleAbandon = async () => {
      await supabase.from('responses').update({ status: 'abandoned' }).eq('id', responseId);
    };

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      handleAbandon();
      e.preventDefault();
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [responseId]);

  // Handle answer submission
  const handleAnswer = async (answerId: number) => {
    if (!responseId) return; // Wait for responseId to be set
    // setResponses((prev) => {
    //     const newResponses = [...prev];
    //     newResponses[step] = answer;
    //     return newResponses;
    // });
    const questionId = questions[step].id;
    const answer = questions[step].answers.find((a) => a.id === answerId)?.answer_text || '';
    setResponses((prev) => {
      const newResponses = [...prev];
      newResponses[step] = answer;
      return newResponses;
    });

    // Insert answer for this question
    await supabase.from('response_answers').insert({
      response_id: responseId,
      question_id: questionId,
      answer_id: answerId,
    });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const profile = getShopperType([...responses.slice(0, step), answer]);

      // Optionally update the response with profile_type, etc.
      await supabase
        .from('responses')
        .update({
          profile_type: getShopperType([...responses.slice(0, step), answer]),
          status: 'completed',
        })
        .eq('id', responseId);

      router.push({
        pathname: '/results',
        query: { profile },
      });
    }
  };

  if (loading) return <div>Loading survey...</div>;
  if (!questions.length) return <div>No questions found.</div>;

  return (
    <>
      <AnalyticsBanner />
      <div
        style={{
          minHeight: '100vh',
          // background: `linear-gradient(135deg, ${mainColors.yellow} 0%, ${mainColors.accent} 100%)`,
          backgroundImage: 'url(/images/bg.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 1rem',
          fontFamily: 'Montserrat, Arial, sans-serif',
        }}
      >
        <div
          style={{
            background: mainColors.white,
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            maxWidth: '420px',
            width: '100%',
            padding: '2rem 1.5rem',
            marginTop: '8rem',
          }}
        >
          <h1
            style={{
              color: mainColors.dark,
              fontWeight: 700,
              fontSize: '2rem',
              marginBottom: '1rem',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            Shopper Questionnaire
          </h1>
          <div
            style={{
              height: '8px',
              width: '100%',
              background: '#eee',
              borderRadius: '4px',
              marginBottom: '2rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(step / questions.length) * 100}%`,
                height: '100%',
                background: mainColors.accent,
                transition: 'width 0.3s',
              }}
            />
          </div>
          <div>
            <Question
              key={questions[step].id}
              question={questions[step].question_text}
              answers={questions[step].answers.map((a) => a)}
              onAnswer={handleAnswer}
            />
          </div>
        </div>
        <footer
          style={{
            marginTop: 'auto',
            padding: '1rem 0',
            color: mainColors.dark,
            fontSize: '0.95rem',
            opacity: 0.7,
          }}
        >
          &copy; {new Date().getFullYear()} The Unforgettable Group
        </footer>
      </div>
    </>
  );
};

export default Home;
