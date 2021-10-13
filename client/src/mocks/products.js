export default [
  {
    _id: '1',
    imgURL: [],
    lang: 'jp',
    keywords: ['shiroikoibito', 'hokkaido'],
    fixedQandA: [
      {
        question: 'What is the name of this product?',
        answers: [
          { userID: 'a', value: 'shiroikoibito', report: { unclear: 0, wrong: 0, harrasment: 0 } }, // type of report TBD
          { userID: 'b', value: 'ishiya shiroikoibito', report: { unclear: 0, wrong: 0, harrasment: 0 } },
        ],
        highlightedBy: ['c', 'd'], // to be cleared when new answer is added with sending notification to the users
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
        highlightedBy: [],
      },
    ],
    uniqQandA: [],
  },
]
