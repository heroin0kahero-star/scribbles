export const BRAND = {
  name: 'Scribbles | Kids Learning',
  shortName: 'Scribbles',
  tagline: 'Helping children master English',
  motto: 'Learn. Understand. Express.',
  subMotto: 'Small steps. Strong foundations. Beautiful beginnings.',
  location: 'Lucknow, India',
  instagramHandle: '@scribbles.lucknow',
  instagramUrl: 'https://www.instagram.com/scribbles.lucknow/',
  logoSrc: '/assets/aistudio/image_749250af.png',
} as const;

export interface ProgrammeInfo {
  id: string;
  slug: string;
  title: string;
  format: 'Online Learning' | 'Offline Learning';
  shortSummary: string;
  philosophyFocus: string;
  accentBg: string;
  accentTone: 'forest' | 'sunflower' | 'coral' | 'sky' | 'mint';
  highlights: string[];
}

export const PROGRAMMES: ProgrammeInfo[] = [
  {
    id: 'phonics',
    slug: '/programmes/phonics',
    title: 'Phonics',
    format: 'Online Learning',
    shortSummary:
      'Building early reading foundations through letter sounds, sound recognition, blending, and decoding rather than rote memorisation.',
    philosophyFocus: 'From single sounds to confident word reading',
    accentBg: 'bg-[#DDE9D9]/65',
    accentTone: 'forest',
    highlights: [
      'Recognising individual letter sounds',
      'Connecting spoken sounds with written letters',
      'Blending sounds smoothly to read simple words',
      'Decoding unfamiliar words step by step',
    ],
  },
  {
    id: 'communication',
    slug: '/programmes/communication',
    title: 'Communication',
    format: 'Online Learning',
    shortSummary:
      'Helping children understand English naturally and express their own thoughts, questions, and ideas with ease.',
    philosophyFocus: 'Confidence in listening, speaking, and expressing',
    accentBg: 'bg-[#C5E3EC]/55',
    accentTone: 'sky',
    highlights: [
      'Encouraging comfortable everyday expression',
      'Building active listening and comprehension',
      'Nurturing clarity without fear of mistakes',
      'Interactive dialogue over scripted repetition',
    ],
  },
  {
    id: 'grammar',
    slug: '/programmes/grammar',
    title: 'Grammar',
    format: 'Online Learning',
    shortSummary:
      'Visual, playful, and relatable explanations of how language works—where understanding grammar beats memorising rules.',
    philosophyFocus: 'Visual discovery of patterns, words, and punctuation',
    accentBg: 'bg-[#F5CB65]/30',
    accentTone: 'sunflower',
    highlights: [
      'Naming words and nouns across everyday life',
      'Homophones such as KNIGHT and NIGHT',
      'Silent letters and spelling patterns like sweep → swept',
      'Punctuation marks and the roles they play',
    ],
  },
  {
    id: 'early-learning',
    slug: '/programmes/early-learning',
    title: 'Early Learning',
    format: 'Offline Learning',
    shortSummary:
      'A gentle, supportive in-person learning environment in Lucknow designed to nurture curiosity and foundational readiness.',
    philosophyFocus: 'Patient guidance for beautiful beginnings',
    accentBg: 'bg-[#EF9B82]/25',
    accentTone: 'coral',
    highlights: [
      'Warm, unhurried offline guidance in Lucknow',
      'Hands-on visual and interactive introduction to language',
      'Respecting each child’s unique pace and curiosity',
      'Encouragement-led foundations over pressure',
    ],
  },
  {
    id: 'tuition',
    slug: '/programmes/tuition',
    title: 'Tuition',
    format: 'Offline Learning',
    shortSummary:
      'Thoughtful offline tuition in Lucknow focused on genuine understanding, steady skill-building, and growing independence.',
    philosophyFocus: 'Clarity and confidence over rote study',
    accentBg: 'bg-[#F6ECD9]',
    accentTone: 'mint',
    highlights: [
      'Understanding-oriented offline academic support',
      'Interactive explanations instead of monotonous drills',
      'Encouraging independent thinking and self-belief',
      'Tailored guidance aligned with each learner’s pace',
    ],
  },
];

export interface LearningCheckpoint {
  number: string;
  label: string;
  copy: string;
  note: string;
  letters: string[];
  accentColor: string;
}

export const LEARNING_CHECKPOINTS: LearningCheckpoint[] = [
  {
    number: '01',
    label: 'Discover',
    copy: 'Every little journey begins with a sound.',
    note: 'A single letter, a gentle curiosity.',
    letters: ['c', 'a', 't'],
    accentColor: '#EF9B82',
  },
  {
    number: '02',
    label: 'Explore',
    copy: 'Discover the sounds behind the words.',
    note: 'Matching ears and eyes together.',
    letters: ['d', 'o', 'g'],
    accentColor: '#F5CB65',
  },
  {
    number: '03',
    label: 'Create',
    copy: 'Little sounds become big discoveries.',
    note: 'Blending sounds into meaning.',
    letters: ['c-a-t', 'd-o-g'],
    accentColor: '#466B56',
  },
  {
    number: '04',
    label: 'Understand',
    copy: "Learning is more than remembering. It's understanding.",
    note: 'Clues, stories, and quiet wonder.',
    letters: ['Read', 'Think'],
    accentColor: '#C5E3EC',
  },
  {
    number: '05',
    label: 'Express',
    copy: 'Learn. Understand. Express.',
    note: 'A confident voice ready to share.',
    letters: ['Speak', 'Write'],
    accentColor: '#DDE9D9',
  },
];

export interface PhonicsWordExample {
  word: string;
  sounds: { letter: string; soundCue: string; color: string }[];
  meaningHint: string;
  spotlightNote: string;
}

export const PHONICS_WORDS: PhonicsWordExample[] = [
  {
    word: 'CAT',
    sounds: [
      { letter: 'C', soundCue: '/k/ as in crisp', color: '#EF9B82' },
      { letter: 'A', soundCue: '/æ/ as in apple', color: '#F5CB65' },
      { letter: 'T', soundCue: '/t/ as in tap', color: '#466B56' },
    ],
    meaningHint: 'A friendly purring pet.',
    spotlightNote: 'Featured in Scribbles’ early reading journey example.',
  },
  {
    word: 'DOG',
    sounds: [
      { letter: 'D', soundCue: '/d/ as in drum', color: '#C5E3EC' },
      { letter: 'O', soundCue: '/ɒ/ as in orange', color: '#F5CB65' },
      { letter: 'G', soundCue: '/ɡ/ as in garden', color: '#466B56' },
    ],
    meaningHint: 'A playful wagging friend.',
    spotlightNote: 'Featured in Scribbles’ early reading journey example.',
  },
  {
    word: 'SUN',
    sounds: [
      { letter: 'S', soundCue: '/s/ as in soft', color: '#F5CB65' },
      { letter: 'U', soundCue: '/ʌ/ as in umbrella', color: '#EF9B82' },
      { letter: 'N', soundCue: '/n/ as in nest', color: '#466B56' },
    ],
    meaningHint: 'The warm light in the morning sky.',
    spotlightNote: 'Website blending illustration.',
  },
  {
    word: 'BED',
    sounds: [
      { letter: 'B', soundCue: '/b/ as in book', color: '#C5E3EC' },
      { letter: 'E', soundCue: '/e/ as in egg', color: '#EF9B82' },
      { letter: 'D', soundCue: '/d/ as in desk', color: '#466B56' },
    ],
    meaningHint: 'A cosy place for bedtime stories.',
    spotlightNote: 'Website blending illustration.',
  },
];

export interface ReadingPassageStage {
  id: string;
  stageNumber: string;
  stageTitle: string;
  difficultyLabel: string;
  passageTitle: string;
  passage: string[];
  clues: { phrase: string; hint: string }[];
  questions: {
    id: string;
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const READING_DETECTIVE_STAGES: ReadingPassageStage[] = [
  {
    id: 'stage-1',
    stageNumber: 'Passage 01',
    stageTitle: 'Stage 1 — Finding Clues',
    difficultyLabel: 'Easy · Ages 4–7 Demo',
    passageTitle: 'The Yellow Boots',
    passage: [
      'Aarav put on his bright yellow boots by the front door.',
      'Outside, tiny puddles sparkled on the garden path.',
      'He picked up his blue umbrella before stepping out.',
    ],
    clues: [
      { phrase: 'tiny puddles sparkled', hint: 'Rain has recently fallen outside.' },
      { phrase: 'blue umbrella', hint: 'A clue about what the weather feels like.' },
    ],
    questions: [
      {
        id: 'q1-1',
        prompt: 'What kind of weather clue can a Reading Detective spot in the story?',
        options: ['It has been raining outside', 'It is a dry, dusty afternoon', 'It is snowing heavily'],
        correctIndex: 0,
        explanation:
          'Sparkling puddles on the path and carrying an umbrella give us strong clues that it has been raining.',
      },
      {
        id: 'q1-2',
        prompt: 'Where were Aarav’s yellow boots kept?',
        options: ['Under his bed', 'By the front door', 'In the garden'],
        correctIndex: 1,
        explanation: 'The first sentence tells us directly that the boots were by the front door.',
      },
    ],
  },
  {
    id: 'stage-2',
    stageNumber: 'Passage 02',
    stageTitle: 'Stage 2 — Connecting Details',
    difficultyLabel: 'Easy–Medium · Ages 4–7 Demo',
    passageTitle: 'A Quiet Note on the Table',
    passage: [
      'Meera walked into the kitchen and saw flour dusted across the wooden table.',
      'A mixing bowl sat next to three cracked eggshells, and the oven smelled warm and sweet.',
      'She smiled and peered toward the kitchen counter.',
    ],
    clues: [
      { phrase: 'flour dusted across the wooden table', hint: 'Someone has been mixing ingredients.' },
      { phrase: 'oven smelled warm and sweet', hint: 'Something sweet is baking right now.' },
    ],
    questions: [
      {
        id: 'q2-1',
        prompt: 'What is most likely happening in the kitchen?',
        options: ['Someone is baking a cake or treat', 'Someone is painting a picture', 'Someone is packing school books'],
        correctIndex: 0,
        explanation: 'Flour, cracked eggshells, a mixing bowl, and a sweet warm oven all connect to baking.',
      },
      {
        id: 'q2-2',
        prompt: 'Why did Meera smile when she walked in?',
        options: ['She noticed the sweet smell and baking clues', 'She found her lost pencil', 'She wanted to go to sleep'],
        correctIndex: 0,
        explanation: 'Connecting the sweet smell from the oven explains why Meera felt happy and curious.',
      },
    ],
  },
  {
    id: 'stage-3',
    stageNumber: 'Passage 03',
    stageTitle: 'Stage 3 — Making Predictions',
    difficultyLabel: 'Medium · Ages 4–7 Demo',
    passageTitle: 'The Missing Bookmark',
    passage: [
      'Rohan closed his storybook before dinner and placed a green leaf inside to save his page.',
      'After dinner, the window near his desk was wide open and a cool breeze blew across the room.',
      'When Rohan opened his book again, the green leaf was nowhere on the page.',
    ],
    clues: [
      { phrase: 'window near his desk was wide open', hint: 'Air from outside entered the room.' },
      { phrase: 'cool breeze blew across the room', hint: 'Light objects like leaves can be moved by wind.' },
    ],
    questions: [
      {
        id: 'q3-1',
        prompt: 'What do the clues suggest happened to the green leaf?',
        options: ['The breeze blew it off the desk', 'A bird ate the storybook', 'The leaf turned into paper'],
        correctIndex: 0,
        explanation: 'An open window and a cool breeze explain how a light leaf could blow away.',
      },
      {
        id: 'q3-2',
        prompt: 'Where should Rohan look first to find his bookmark?',
        options: ['On the floor near his desk', 'Inside the kitchen fridge', 'Outside in his boots'],
        correctIndex: 0,
        explanation: 'Following the path of the breeze around his desk is a smart detective prediction.',
      },
    ],
  },
];

export interface ParentStoryTheme {
  id: string;
  label: string;
  title: string;
  summary: string;
  observation: string;
  sourceLabel: string;
  instagramUrl: string;
  accentBg: string;
}

export const PARENT_STORY_THEMES: ParentStoryTheme[] = [
  {
    id: 'confidence',
    label: 'Online Learning Feedback',
    title: 'Growing Confidence & Independent Learning',
    summary:
      'Parents sharing feedback on Scribbles’ online sessions highlight steady improvement in learning, greater comfort speaking and reading, and children becoming more independent learners.',
    observation:
      'Focus shifts away from memorising answers toward genuinely understanding concepts at the child’s pace.',
    sourceLabel: 'View parent feedback highlights on @scribbles.lucknow',
    instagramUrl: BRAND.instagramUrl,
    accentBg: 'bg-[#DDE9D9]/55',
  },
  {
    id: 'early-reading',
    label: 'Early Reading Progression',
    title: 'From Individual Letter Sounds to Reading Simple Words',
    summary:
      'A documented learning milestone on Scribbles’ Instagram follows a three-year-old learner moving from recognising letter sounds to blending and reading simple words such as CAT and DOG.',
    observation:
      'Shared as an encouraging example of how sound-first reading builds real curiosity—recognising that every child’s timeline is uniquely their own.',
    sourceLabel: 'Watch the early reading story on @scribbles.lucknow',
    instagramUrl: BRAND.instagramUrl,
    accentBg: 'bg-[#F5CB65]/30',
  },
  {
    id: 'concept-clarity',
    label: 'Understanding Concepts',
    title: 'Better Concept Understanding Without Pressure',
    summary:
      'Feedback from families notes that visual, unhurried explanations help children grasp phonics, communication, and grammar ideas clearly rather than feeling intimidated by rules.',
    observation:
      'When children understand why something works, confidence grows naturally across reading and expression.',
    sourceLabel: 'Read community stories on @scribbles.lucknow',
    instagramUrl: BRAND.instagramUrl,
    accentBg: 'bg-[#C5E3EC]/50',
  },
];

export type JournalCategory =
  | 'All'
  | 'Reading Tips'
  | 'Phonics'
  | 'Grammar'
  | 'Communication'
  | 'Learning Through Play';

export const JOURNAL_CATEGORIES: JournalCategory[] = [
  'All',
  'Reading Tips',
  'Phonics',
  'Grammar',
  'Communication',
  'Learning Through Play',
];

export interface JournalEntry {
  id: string;
  category: Exclude<JournalCategory, 'All'>;
  issueNumber: string;
  title: string;
  excerpt: string;
  takeaway: string;
  relatedRoute: string;
  accentBg: string;
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'reading-detective-thinking',
    category: 'Reading Tips',
    issueNumber: 'Note 01',
    title: 'Reading Is More Than Saying Words Correctly',
    excerpt:
      'Why Scribbles created Reading Detective for ages 4–7: guiding young readers to spot story clues, make predictions, and connect meaning beyond the page.',
    takeaway: 'Ask “what clue told you that?” after a short passage.',
    relatedRoute: '/reading-lab',
    accentBg: 'bg-[#C5E3EC]/45',
  },
  {
    id: 'sound-before-memorising',
    category: 'Phonics',
    issueNumber: 'Note 02',
    title: 'Why Blending Sounds Outlasts Memorising Word Lists',
    excerpt:
      'When children hear and connect individual sounds before blending words like CAT and DOG, unfamiliar words become puzzles they can decode themselves.',
    takeaway: 'Slow sound-by-sound blending builds calm decoding habits.',
    relatedRoute: '/programmes/phonics',
    accentBg: 'bg-[#DDE9D9]/55',
  },
  {
    id: 'homophones-knight-night',
    category: 'Grammar',
    issueNumber: 'Note 03',
    title: 'Knight and Night: Teaching Homophones Through Stories',
    excerpt:
      'Words that sound identical can look and mean completely different things. Visual scenes help children remember spelling naturally through context.',
    takeaway: 'Pair sound-alike words with contrasting mini-pictures.',
    relatedRoute: '/programmes/grammar',
    accentBg: 'bg-[#F5CB65]/28',
  },
  {
    id: 'sweep-to-swept',
    category: 'Grammar',
    issueNumber: 'Note 04',
    title: 'Spotting Spelling Patterns: From Sweep to Swept',
    excerpt:
      'Instead of asking children to cram irregular past-tense tables, visual pattern grouping reveals quiet family rhythms in English spelling.',
    takeaway: 'Notice how similar word families change together.',
    relatedRoute: '/programmes/grammar',
    accentBg: 'bg-[#F6ECD9]',
  },
  {
    id: 'confident-voice',
    category: 'Communication',
    issueNumber: 'Note 05',
    title: 'Helping Children Express Ideas Without Hesitation',
    excerpt:
      'English communication blooms when children feel heard, encouraged, and safe to try new words in everyday conversation.',
    takeaway: 'Celebrate clear thought first before polishing phrasing.',
    relatedRoute: '/programmes/communication',
    accentBg: 'bg-[#EF9B82]/22',
  },
  {
    id: 'punctuation-roles',
    category: 'Learning Through Play',
    issueNumber: 'Note 06',
    title: 'Giving Punctuation Marks Personality and Purpose',
    excerpt:
      'A full stop rests, a question mark wonders, and an exclamation mark celebrates. Playful roles help children read with natural expression.',
    takeaway: 'Read the same sentence three ways using different end marks.',
    relatedRoute: '/programmes/grammar',
    accentBg: 'bg-[#DDE9D9]/45',
  },
];
