import { generateFullComment } from '../mock/comment';

export default class FullCommentModel {
  comments = Array.from({length: 4}, generateFullComment());

  getComments = () => this.comments;
}
