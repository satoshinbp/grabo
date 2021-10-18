export default [
  {
    _id: '1',
    images: [
      {
        url: 'https://picsum.photos/id/123/200/300',
        report: {
          unclear: 0,
          wrong: 0,
          harrasment: 0,
        },
      },
    ],
    group: 'jp',
    keywords: ['白い恋人', '北海道'],
    fixedQuestions: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userId: 'a', description: 'shiroikoibito', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
        ],
        highlightedBy: [], // to be cleared when new answer is added with sending notification to the users
      },
      {
        question: 'Who is the maker of this product',
        answers: [{ userId: 'b', description: 'ishiya', report: { unclear: 0, wrong: 0, harrasment: 0 } }],
        highlightedBy: [],
      },
      {
        question: 'What is the taste of this product?',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'What is this product used for?',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'Please review this product.',
        answers: [],
        highlightedBy: [],
      },
    ],
    uniqQuestions: [],
  },
  {
    _id: '2',
    images: [
      {
        url: 'https://picsum.photos/id/234/200/300',
        report: {
          unclear: 0,
          wrong: 0,
          harrasment: 0,
        },
      },
    ],
    group: 'jp',
    keywords: ['kitkat', 'nestle kitkat'],
    fixedQuestions: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userId: 'c', description: 'kitkat', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
          { userId: 'd', description: 'kitkat chocolate matcha', report: { unclear: 0, wrong: 0, harrasment: 0 } },
        ],
        highlightedBy: [], // to be cleared when new answer is added with sending notification to the users
      },
      {
        question: 'Where is the origin of this product?',
        answers: [],
        highlightedBy: ['e', 'f'],
      },
      {
        question: 'Who is the maker of this product',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'What is the genre of this product',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'Please describe about this product',
        answers: [],
        highlightedBy: [],
      },
    ],
    uniqQuestions: [],
  },
  {
    _id: '3',
    images: [
      {
        url: 'https://picsum.photos/id/345/200/300',
        report: {
          unclear: 0,
          wrong: 0,
          harrasment: 0,
        },
      },
    ],
    group: 'hi',
    keywords: ['समोसा रेसिपी'],
    fixedQuestions: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userId: 'a', description: 'samosa', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
        ],
        highlightedBy: [], // to be cleared when new answer is added with sending notification to the users
      },
      {
        question: 'Where is the origin of this product?',
        answers: [],
        highlightedBy: ['g'],
      },
      {
        question: 'Who is the maker of this product',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'What is the genre of this product',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'Please describe about this product',
        answers: [],
        highlightedBy: [],
      },
    ],
    uniqQuestions: [],
  },
  {
    _id: '4',
    images: [
      {
        url: 'https://picsum.photos/id/456/200/300',
        report: {
          unclear: 0,
          wrong: 0,
          harrasment: 0,
        },
      },
    ],
    group: 'ko',
    keywords: ['현대수산맛김'],
    fixedQuestions: [
      {
        question: 'What is the name of this product?',
        answers: [],
        highlightedBy: ['c'], // to be cleared when new answer is added with sending notification to the users
      },
      {
        question: 'Where is the origin of this product?',
        answers: [],
        highlightedBy: ['f'],
      },
      {
        question: 'Who is the maker of this product',
        answers: [
          { userId: 'b', description: 'hyundaekim', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
        ],
        highlightedBy: [],
      },
      {
        question: 'What is the genre of this product',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'Please describe about this product',
        answers: [],
        highlightedBy: [],
      },
    ],
    uniqQuestions: [],
  },
  {
    _id: '5',
    images: [
      {
        url: 'https://picsum.photos/id/567/200/300',
        report: {
          unclear: 0,
          wrong: 0,
          harrasment: 0,
        },
      },
    ],
    group: 'zh',
    keywords: ['豆板醤', '李錦記'],
    fixedQuestions: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userId: 'd', description: 'doubanjiang', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
          { userId: 'f', description: 'chili bean sauce', report: { unclear: 0, wrong: 0, harrasment: 0 } },
        ],
        highlightedBy: [], // to be cleared when new answer is added with sending notification to the users
      },
      {
        question: 'Where is the origin of this product?',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'Who is the maker of this product',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'What is the genre of this product',
        answers: [],
        highlightedBy: [],
      },
      {
        question: 'Please describe about this product',
        answers: [],
        highlightedBy: ['i', 'j'],
      },
    ],
    uniqQuestions: [],
  },
]
