import { getRandomInteger, getRandomElement } from '../util.js';
import { comments, authors, emotions } from './const.js';

const generateTextComment = () => getRandomElement(comments);
const generateAuthor = () => getRandomElement(authors);
const generateEmotion = () => getRandomElement(emotions);

export const generateComment = (movieId) => ({
  'id': movieId,
  'author': generateAuthor(),
  'comment': generateTextComment(),
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': generateEmotion()
});
