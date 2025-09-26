import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

type ShopperProfile = {
  name: string;
  description: string;
  image: string;
  details: string;
};

const profiles: Record<string, ShopperProfile> = {
  Dorothee: {
    name: 'Dorothee',
    description:
      'The seeker, always searching for meaning and connection. Dorothee is curious, open-hearted, and ready for adventure.',
    image: '/images/dorothee.png',
    details:
      'A modern gal who knows what she wants and is not afraid to work hard to get it. Dorothee represents those of us who are social shoppers that love to shop with friends, share the good news about what she found, and is always trying to find the perfect gift. She is definitely on the trendy side, enjoys shopping even when it is necessary, and she is willing to help others find what they need.',
  },
  Toto: {
    name: 'Toto',
    description:
      'The loyal companion, always by your side. Toto is playful, protective, and brings joy wherever he goes.',
    image: '/images/toto.png',
    details:
      'A pup that knows what he wants, Toto embodies the shopper who is very focused when they shop. Often on a mission and never wavering with a desire to find it without delay. Much like a pup dashing straight for his ball, Toto" shoppers zero in on what we want often ignoring everything else. First to find the latest Smart collar, stylish bowl, or indestructible dog toy.',
  },
  Tin: {
    name: 'Tin',
    description:
      'The thoughtful one, seeking heart and compassion. Tin values kindness, empathy, and genuine relationships.',
    image: '/images/tin.png',
    details:
      'The Tin Man represents the shopper who makes shopping decisions with lots of heart, often making buying decisions with emotion and tend to rely on others to help guide the way. They love a good expert that recommends safer dog food, chooses a trip to the beach based on images of waves, or finding items that have strong personal meaning that tell others what is in their heart.',
  },
  Lyon: {
    name: 'Lyon',
    description:
      'The brave soul, facing fears with courage. Lyon is bold, determined, and inspires others to be their best.',
    image: '/images/lyon.png',
    details:
      'Confident in life, the Lyon Shopper often hesitates before making a buying decision without the endorsement of an authoritative figure. Validation or instructions from trusted sources is very helpful in combatting the fear of being misled or facing the unpredictability of their choices. Lyons try to fix "buyer\'s remorse" before they make a purchase or put off making a purchase to build their confidence.',
  },
  'Hutch & Straw': {
    name: 'Hutch & Straw',
    description:
      'The clever thinker, always looking for wisdom. Hutch & Straw are resourceful, inventive, and love solving problems.',
    image: '/images/hutch-straw.png',
    details:
      'Hutch & Straw represent the Scarecrow shopper that is led with the brain and heading straight for the search bar to learn everything they can before making a purchase, sometimes researching for days. We all tend to be this type of shopper when making major purchases. There is an overwhelming need to make the right decision and too much research is never enough.',
  },
  Glinda: {
    name: 'Glinda',
    description:
      'The gentle guide, offering support and encouragement. Glinda is wise, nurturing, and helps others find their way.',
    image: '/images/glinda.png',
    details:
      'Glinda represents the shopper who doesn’t pick and choose when shopping, they tend to buy everything, covering all bases. They don’t worry about cost and tend to not spare any expense. Everyone may be this type of shopper when starting a new hobby, planning a big trip, or planning a wedding. Shopping is sometimes seen as a sport for the Glinda shopper and they are very good at it.',
  },
  Theda: {
    name: 'Theda',
    description:
      'The mysterious force, bringing transformation. Theda is powerful, insightful, and helps others grow.',
    image: '/images/theda.png',
    details:
      'So maybe hating to shop is wicked, but for the Theda shopper, the act of shopping can be a nightmare and often done out of sheer necessity. We may all find ourselves in the Theda mood when shopping for swimsuits. This shopper prefers a no-fuss experience that is simple and allows the "to do" list to be checked. They might grumble a bit, but they appreciate some guidance.',
  },
  'Amen & Bow': {
    name: 'Amen & Bow',
    description:
      'The celebrators, honoring the journey and its lessons. Amen & Bow are grateful, joyful, and bring closure and reflection.',
    image: '/images/amen-bow.png',
    details:
      'The Munchkin shopper buys out of necessity, frequently making purchases without giving it much thought—just a quick grab of their phone, and the order is placed. Their shopping list is practical, often filled with essentials such as groceries, gifts, or the latest electronics. Deep down, we\'re all children at heart, shopping with the carefree joy of someone who shops "as if no one is watching."',
  },
};

const AllProfiles: React.FC = () => {
  const router = useRouter();

  // Optionally, get the user's profile from the query string
  const { profile } = router.query;

  const handleBack = () => {
    // If profile is available, preserve it in the query string
    if (profile) {
      router.push(`/results?profile=${profile}`);
    } else {
      router.push('/results');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFD600 0%, #F7B32B 100%)',
        fontFamily: 'Montserrat, Arial, sans-serif',
        padding: '1rem',
      }}
    >
      <button
        onClick={handleBack}
        style={{
          display: 'block',
          margin: '0 auto 2rem auto',
          padding: '0.75rem 1.5rem',
          background: '#222',
          color: '#FFD600',
          fontWeight: 700,
          fontSize: '1rem',
          border: 'none',
          borderRadius: '0.75rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        Back to My Results
      </button>
      <h1 style={{ textAlign: 'center', color: '#222', marginBottom: '2rem', fontSize: '2rem' }}>
        All Shopper Profiles
      </h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {Object.values(profiles).map((profile) => (
          <div
            key={profile.name}
            style={{
              background: '#fff',
              borderRadius: '1.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: '1.5rem',
              width: '100%',
              maxWidth: 320,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'relative', width: 120, height: 120, marginBottom: '1rem' }}>
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                sizes="120px"
                style={{ objectFit: 'contain', borderRadius: '1rem' }}
              />
            </div>
            <h2
              style={{
                color: '#222',
                fontSize: '1.25rem',
                margin: '0.5rem 0',
                textAlign: 'center',
              }}
            >
              {profile.name}
            </h2>
            <p
              style={{
                color: '#555',
                fontSize: '1rem',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}
            >
              {profile.description}
            </p>
            <p style={{ color: '#333', fontSize: '0.95rem', textAlign: 'center' }}>
              {profile.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProfiles;
