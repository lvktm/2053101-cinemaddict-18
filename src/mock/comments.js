import { getRandomInteger, getRandomElement } from '../util.js';
import { comments, authors, emotions } from './const.js';

const generateComment = () => getRandomElement(comments);
const generateAuthor = () => getRandomElement(authors);
const generateEmotion = () => getRandomElement(emotions);

export const generateFullComment = () => ({
  'id': '42',
  'author': generateAuthor(),
  'comment': generateComment(),
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': generateEmotion()
});
