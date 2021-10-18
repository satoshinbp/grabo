export default [
  {
    _id: '1',
    images: [
      {
        image: 'https://picsum.photos/id/123/200/300',
        report: {
          unclear: 0,
          wrong: 0,
          harrasment: 0,
        },
      },
    ],
    group: 'jp',
    keywords: ['白い恋人', '北海道'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userId: 'a', value: 'shiroikoibito', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
        ],
        highlightedBy: [], // to be cleared when new answer is added with sending notification to the users
      },
      {
        question: 'Who is the maker of this product',
        answers: [{ userId: 'b', value: 'ishiya', report: { unclear: 0, wrong: 0, harrasment: 0 } }],
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
    uniqQandA: [],
  },
  {
    _id: '2',
    images: ['https://picsum.photos/id/234/200/300'],
    group: 'jp',
    keywords: ['kitkat', 'nestle kitkat'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userId: 'c', value: 'kitkat', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
          { userId: 'd', value: 'kitkat chocolate matcha', report: { unclear: 0, wrong: 0, harrasment: 0 } },
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
    images: ['https://picsum.photos/id/345/200/300'],
    group: 'hi',
    keywords: ['समोसा रेसिपी'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userId: 'a', value: 'samosa', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
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
    images: ['https://picsum.photos/id/456/200/300'],
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
          { userId: 'b', value: 'hyundaekim', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
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
    images: ['https://picsum.photos/id/567/200/300'],
    group: 'zh',
    keywords: ['豆板醤', '李錦記'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userId: 'd', value: 'doubanjiang', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
          { userId: 'f', value: 'chili bean sauce', report: { unclear: 0, wrong: 0, harrasment: 0 } },
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
