import { getRandomElement, randomYearMonthDayHourMinute } from '../util.js';
import { comments, authors, emotions } from './const.js';

const generateTextComment = () => getRandomElement(comments);
const generateAuthor = () => getRandomElement(authors);
const generatCommentDate = () => randomYearMonthDayHourMinute();
const generateEmotion = () => getRandomElement(emotions);

export const generateComment = (commentId) => ({
  'id': commentId,
  'author': generateAuthor(),
  'comment': generateTextComment(),
  'date': generatCommentDate(),
  'emotion': generateEmotion()
});
