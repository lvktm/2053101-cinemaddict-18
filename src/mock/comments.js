import { getRandomInteger } from '../util';

const generateComment = () => {
  const COMMENTS = [
    'a film that changed my life',
    'a true masterpiece',
    'post-credit scene was just amazing omg.'
  ];

  const getRandomIndex = getRandomInteger(0, COMMENTS.length - 1);

  return COMMENTS[getRandomIndex];
};

export const generateFullComment = () => ({
  'id': '42',
  'author': 'Ilya O\'Reilly',
  'comment': generateComment(),
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': 'smile'
});
