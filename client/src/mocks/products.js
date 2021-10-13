export default [
  {
    _id: '1',
    image: [],
    group: 'jp',
    keywords: ['白い恋人', '北海道'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userID: 'a', value: 'shiroikoibito', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
        ],
        highlightedBy: [], // to be cleared when new answer is added with sending notification to the users
      },
      {
        question: 'Where is the origin of this product?',
        answers: [],
        highlightedBy: ['c', 'd'],
      },
      {
        question: 'Who is the maker of this product',
        answers: [{ userID: 'b', value: 'ishiya', report: { unclear: 0, wrong: 0, harrasment: 0 } }],
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
    uniqQandA: [],
  },
  {
    _id: '2',
    image: [],
    group: 'jp',
    keywords: ['kitkat', 'nestle kitkat'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userID: 'c', value: 'kitkat', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
          { userID: 'd', value: 'kitkat chocolate matcha', report: { unclear: 0, wrong: 0, harrasment: 0 } },
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
    uniqQandA: [],
  },
  {
    _id: '3',
    image: [],
    group: 'hi',
    keywords: ['समोसा रेसिपी'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userID: 'a', value: 'samosa', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
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
    uniqQandA: [],
  },
  {
    _id: '4',
    image: [],
    group: 'ko',
    keywords: ['현대수산맛김'],
    fixedQandA: [
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
          { userID: 'b', value: 'hyundaekim', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
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
    uniqQandA: [],
  },
  {
    _id: '5',
    image: [],
    group: 'zh',
    keywords: ['豆板醤', '李錦記'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userID: 'd', value: 'doubanjiang', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
          { userID: 'f', value: 'chili bean sauce', report: { unclear: 0, wrong: 0, harrasment: 0 } },
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
    uniqQandA: [],
  },
]
