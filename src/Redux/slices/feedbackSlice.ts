import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils";
import { CommentObject, Feedback } from "../model";

export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/feedback`);
      return data;
    } catch (error: any) {
      return error.rejectWithValue({ error: error.message });
    }
  }
);

interface FeedbackState {
  feedback: Feedback[];
  activeFeedback: Feedback[];
  singleFeedback: Feedback;
  loading: boolean;
  error: string | undefined;
}

const initialState: FeedbackState = {
  feedback: [],
  activeFeedback: [],
  loading: true,
  error: "",
  singleFeedback: {},
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    feedbackCategoryChange: (state, { payload }) => {
      const category = payload.category;
      if (category === "All") {
        state.activeFeedback = state.feedback;
        return;
      }
      state.activeFeedback = state.feedback.filter(
        (feed) => feed.feedbackCategory === category
      );
    },
    removeComment: (state, { payload }) => {
      const { feedback, comment } = payload;
      state.activeFeedback.forEach((feed) =>
        feed._id === feedback
          ? feed.comment.splice(feed.comment.indexOf(comment), 1)
          : null
      );
      state.feedback.forEach((feed) =>
        feed._id === feedback
          ? feed.comment.splice(feed.comment.indexOf(comment), 1)
          : null
      );
      state.singleFeedback.comment.splice(
        (state.singleFeedback.comment as any).indexOf(comment),
        1
      );
    },
    updateFeedback: (state, { payload }) => {
      const { feedbackId, data } = payload;
      state.singleFeedback = data;
      state.activeFeedback = state.activeFeedback.map((feed) =>
        feed._id === feedbackId ? data : feed
      );
      state.feedback = state.feedback.map((feed) =>
        feed._id === feedbackId ? data : feed
      );
    },
    removeFeedback: (state, { payload }) => {
      const { feedbackId } = payload;
      state.activeFeedback.forEach((feed) =>
        feed._id === feedbackId
          ? state.activeFeedback.splice(state.activeFeedback.indexOf(feed), 1)
          : null
      );
      state.feedback.forEach((feed) =>
        feed._id === feedbackId
          ? state.feedback.splice(state.feedback.indexOf(feed), 1)
          : null
      );
    },
    removeSubComment: (state, { payload }) => {
      const newComment = payload;
      state.singleFeedback.comment = newComment;
      state.activeFeedback = state.activeFeedback = state.activeFeedback.map(
        (feed) => (feed._id === newComment.feedback ? newComment : feed)
      );
      state.feedback = state.feedback = state.feedback.map((feed) =>
        feed._id === newComment.feedback ? newComment : feed
      );
    },
    addSubComments: (state, { payload }) => {
      const newComment = payload;
      state.singleFeedback.comment = state.singleFeedback.comment.map(
        (comment: CommentObject) =>
          comment._id === newComment[0]._id ? newComment[0] : comment
      );
      state.feedback = state.feedback.map((feed) => {
        if (feed._id === newComment[0].feedback) {
          feed.comment = feed.comment.map((comment: CommentObject) =>
            comment._id === newComment[0]._id ? newComment[0] : comment
          );
        }
        return feed;
      });
      state.activeFeedback = state.activeFeedback.map((feed) => {
        if (feed._id === newComment[0].feedback) {
          feed.comment = feed.comment.map((comment: CommentObject) =>
            comment._id === newComment[0]._id ? newComment[0] : comment
          );
        }
        return feed;
      });
    },
    addComments: (state, { payload }) => {
      const newComment = payload[0];
      state.activeFeedback.forEach((feed: Feedback) =>
        feed._id === newComment.feedback ? feed.comment.push(newComment) : null
      );
      state.feedback.forEach((feed: Feedback) =>
        feed._id === newComment.feedback ? feed.comment.push(newComment) : null
      );
    },
    populateSingleFeedback: (state, { payload }) => {
      const id = payload;
      const singleFeeds = state.feedback.find((feed) => feed._id === id);
      state.singleFeedback = { ...singleFeeds };
    },
    populateThroughApi: (state, { payload }) => {
      state.singleFeedback = payload;
    },
    addNewFeedback: (state, { payload }) => {
      state.feedback.push(payload);
      state.activeFeedback.push(payload);
    },
    sortedFeedback: (state, { payload }) => {
      const compare = (a: Feedback, b: Feedback) => {
        if (payload === "Most Upvotes") {
          if (a.upvote.length > 0 && b.upvote.length > 0) {
            return b.upvote[0]?.user.length - a.upvote[0]?.user.length;
          }
          return 0;
        }
        if (payload === "Most Comments") {
          return b.comment.length - a.comment.length;
        }
        if (payload === "Least UpVotes") {
          if (a.upvote.length > 0 && b.upvote.length > 0) {
            return a.upvote[0]?.user.length - b.upvote[0]?.user.length;
          }
          return 0;
        }
        if (payload === "Least Comments") {
          return a.comment.length - b.comment.length;
        }
        return 0;
      };
      state.activeFeedback = state.activeFeedback.sort(compare);
    },
    updateUpVote: (state, action) => {
      const { user: users, feedback } = action.payload;
      state.activeFeedback.forEach((feed: Feedback) => {
        if (feed._id === (feedback._id || feedback)) {
          if (feed.upvote.length > 0) {
            feed.upvote[0].user = users;
          } else {
            feed.upvote.push(action.payload);
          }
        }
      });
      state.feedback.forEach((feed: Feedback) => {
        if (feed._id === (feedback._id || feedback)) {
          if (feed.upvote.length > 0) {
            feed.upvote[0].user = users;
          } else {
            feed.upvote.push(action.payload);
          }
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, { payload }) => {
        state.feedback = payload.data;
        state.activeFeedback = payload.data;
        state.loading = false;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  feedbackCategoryChange,
  addNewFeedback,
  populateSingleFeedback,
  sortedFeedback,
  addComments,
  removeFeedback,
  removeComment,
  updateFeedback,
  removeSubComment,
  addSubComments,
  updateUpVote,
  populateThroughApi,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
