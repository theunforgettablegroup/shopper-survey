import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Question from '../components/Question';
import { QuestionType } from '../types';

const questions: QuestionType[] = [
    {
        id: 1,
        text: 'What type of products do you usually buy?',
        answers: ['Electronics', 'Clothing', 'Groceries', 'Home Goods'],
    },
    {
        id: 2,
        text: 'How often do you shop online?',
        answers: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
    },
    {
        id: 3,
        text: 'What influences your shopping decisions the most?',
        answers: ['Price', 'Quality', 'Brand', 'Reviews'],
    },
];

const mainColors = {
    yellow: '#FFD600',
    dark: '#222222',
    accent: '#F7B32B',
    white: '#FFFFFF',
};

const getShopperType = (responses: string[]) => {
    const [product, frequency, influence] = responses;

    if (product === 'Electronics') return 'Tin';
    if (product === 'Clothing') return 'Glinda';
    if (product === 'Groceries') return 'Dorothee';
    if (product === 'Home Goods') return 'Hutch & Straw';

    if (frequency === 'Daily') return 'Toto';
    if (frequency === 'Weekly') return 'Lyon';
    if (frequency === 'Monthly') return 'Theda';
    if (frequency === 'Rarely') return 'Amen & Bow';

    return 'Dorothee';
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
                background: `linear-gradient(135deg, ${mainColors.yellow} 0%, ${mainColors.accent} 100%)`,
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
                    marginTop: '2rem',
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