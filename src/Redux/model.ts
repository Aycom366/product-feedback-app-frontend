export interface InitalState {
  name?: string;
  userId?: string;
  pic?: string;
  email?: string;
}
export interface AddFeedback {
  feedbackTitle: string;
  feedbackCategory: string;
  feedbackDetails: string;
  feedbackStatus?: string;
}
export interface UserInformation {
  _id?: string;
  name: string;
  email: string;
  pic: string;
}
export interface SubCommentObject {
  content: string;
  sender: UserInformation;
  owner: UserInformation;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface CommentObject {
  _id: string;
  feedback: string;
  content: string;
  sender: UserInformation;
  subcomment: SubCommentObject[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  comment: CommentObject[];
}

export interface UpvoteObject {
  _id: string;
  user: string[];
  feedback: string;
}

interface Upvote {
  upvote: UpvoteObject[];
}

export interface Feedback {
  _id?: string | any;
  feedbackTitle?: string;
  feedbackCategory?: string;
  feedbackDetails?: string;
  user?: UserInformation;
  feedbackStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comment?: Comment | any;
  upvote?: Upvote | any;
}
