import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Question from '../components/Question';
import { QuestionType } from '../types';

const questions: QuestionType[] = [
    {
        id: 1,
        text: 'Rate Your Enjoyment in Shopping Online',
        answers: ['I love shopping online', 'I like shopping online', 'I don\'t have a strong opinion one way or the other', 'I dislike shopping online'],
    },
    {
        id: 2,
        text: 'Which Choice Best Describes You?',
        answers: ['I do a lot of research before I buy', 'I buy based on expert recommendation, reviews or a friend.', 'I am swayed by influencers, videos and social media.', 'I know what I like, and I buy.'],
    },
    {
        id: 3,
        text: 'When Planning A Party I',
        answers: ['Buy everything and a little extra just to be safe.', 'Buy the bare minimum.', 'I like to get creative, find great bargains, and usually buy too much.'],
    },
    {
        id: 4,
        text: 'I Shop This Way',
        answers: ['I shop on a budget, sometimes you just need those shoes.', 'I am willing to spend, but I want to make sure I am making the right decision.', 'I just shop and ask for forgiveness later.', 'Money is no object.'],
    },
    {
        id: 5,
        text: 'I Enjoy Shopping',
        answers: ['By myself.', 'With others.', 'Would enjoy a personal shopper.'],
    },
    {
        id: 6,
        text: 'I Wish All Shopping Was Like This',
        answers: ['I wish I could shop with friends online.', 'I wish everything I needed was in one place and organized.', 'I wish I could see how it fits, sounds and works.', 'I wish I knew and could trust the products I buy online.'], 
    },
]

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

    else{
        if (second === 'I do a lot of research before I buy') {
            hutch++;
        }
        else if (second === 'I buy based on expert recommendation, reviews or a friend.') {
            lyon++;
        }
        else if (second === 'I am swayed by influencers, videos and social media.') {
            tin++;
        }
        else if (second === 'I know what I like, and I buy.') {
            toto++;
        }
        if (third === 'Buy everything and a little extra just to be safe.') {
            glinda++;
        }
        else if (third === 'Buy the bare minimum.') {
            theda++;
        }
        else if (third === 'I like to get creative, find great bargains, and usually buy too much.') {
            dorothee++;
        }
        if (fourth === 'I shop on a budget, sometimes you just need those shoes.') {
            dorothee++;
        }
        else if (fourth === 'I am willing to spend, but I want to make sure I am making the right decision.') {
            hutch++;
        }
        else if (fourth === 'I just shop and ask for forgiveness later.') {
            return 'Amen & Bow'
        }
        else if (fourth === 'Money is no object.') {
            glinda++;
        }
        if (fifth === 'By myself.') {
            tin++;
        }
        else if (fifth === 'With others.') {
            dorothee++;
            hutch++;
        }
        else if (fifth === 'Would enjoy a personal shopper.') {
            glinda++;
        }
        if (sixth === 'I wish I could shop with friends online.') {
            dorothee++;
        }
        else if (sixth === 'I wish everything I needed was in one place and organized.') {
            glinda++;
        }
        else if (sixth === 'I wish I could see how it fits, sounds and works.') {
            hutch++;
        }
        else if (sixth === 'I wish I knew and could trust the products I buy online.') {
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
        const topProfiles = Object.keys(scores).filter(profile => scores[profile] === maxScore);

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

    const handleAnswer = (answer: string) => {
        setResponses((prev) => {
            const newResponses = [...prev];
            newResponses[step] = answer;
            return newResponses;
        });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            const profile = getShopperType([...responses.slice(0, step), answer]);
            router.push({
                pathname: '/results',
                query: { profile },
            });
        }
    };

    return (
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
                            width: `${((step) / questions.length) * 100}%`,
                            height: '100%',
                            background: mainColors.accent,
                            transition: 'width 0.3s',
                        }}
                    />
                </div>
                <div>
                    <Question
                        key={questions[step].id}
                        question={questions[step].text}
                        answers={questions[step].answers}
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
    );
};

export default Home;