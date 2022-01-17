import { Feedback } from "../Redux/model";

enum Status {
  PROGRESS = "In-Progress",
  PLANNED = "Planned",
  LIVE = "Live",
}

export const GetStatusCount = (
  feedback: Feedback[],
  feedbackStatus: Status
) => {
  const count = feedback.reduce((prevVal: number, currVal: Feedback) => {
    if (currVal.feedbackStatus === feedbackStatus) {
      prevVal++;
    }
    return prevVal;
  }, 0);

  return count;
};
