import axios from "axios";
import { CommentObject, UpvoteObject } from "../Redux/model";

export const currentUserUpVoted = (
  upvote: UpvoteObject[],
  currentUser: any
) => {
  if (upvote && upvote.length > 0) {
    return upvote?.some((up: UpvoteObject) =>
      up.user.includes(currentUser.userId)
    );
  }
  return false;
};

export const CountComment = (comment: any) => {
  if (comment && comment?.length > 0) {
    const noOfComment = comment?.reduce(
      (total: number, current: CommentObject) => {
        const subCount = current?.subcomment?.length;
        total += subCount;
        return total;
      },
      comment?.length
    );
    return noOfComment;
  }
  return 0;
};

export const Status = [
  {
    id: 0,
    name: "Suggestion",
  },
  {
    id: 1,
    name: "Planned",
  },
  {
    id: 2,
    name: "In-Progress",
  },
  {
    id: 3,
    name: "Live",
  },
];

export enum FeedbackStatus {
  PLANNED = "Planned",
  IN_PROGRESS = "In-Progress",
  LIVE = "Live",
}

export const checkColor = (feedbackStatus: string) => {
  if (FeedbackStatus.PLANNED === feedbackStatus) return "#F49F85";
  if (FeedbackStatus.IN_PROGRESS === feedbackStatus) return "#AD1FEA";
  if (FeedbackStatus.LIVE === feedbackStatus) return "#62BCFA";
  return "black";
};

// export const instance = axios.create({
//   baseURL: "https://product-feedback-mern-app.herokuapp.com",
//   withCredentials: true,
// });
