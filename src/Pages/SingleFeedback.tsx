/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from "react";

import {
  Flex,
  Stack,
  useDisclosure,
  Box,
  Button,
  Spacer,
  useToast,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ToastStatus } from "../utils/ToastStatus";
import GoBack from "../components/GoBack";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import {
  addComments,
  populateSingleFeedback,
  populateThroughApi,
} from "../Redux/slices/feedbackSlice";
import ModalWrapper from "../components/HomePage/MainContent/ModalWrapper";
import CommentTextArea from "../components/Single Feedback/CommentTextArea";
import { CountComment } from "../utils";
import { CommentObject } from "../Redux/model";
import CommentContainer from "../components/Single Feedback/CommentContainer";
import axios from "axios";
const FeedbackContainer = React.lazy(
  () => import("../components/FeedbackContainer")
);

const SingleFeedback = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleFeedback } = useSelector((state: RootState) => state.feedback);
  const user = useSelector((state: RootState) => state.user);

  const [charactersRemaining, setCharactersRemaining] = useState(250);
  const [newComment, setNewComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCommentAdding, setIsCommentAdding] = useState(false);
  const [commentsInput, setCommentsInput] = useState<any>([]);
  const [commentArray, setCommentArray] = useState<any>(commentsInput);

  const handleCount = () => {
    setCharactersRemaining(250 - newComment.length);
  };

  function ToastMessage(
    title: string,
    description: string,
    status: ToastStatus,
    duration?: number | 3000
  ) {
    return toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      position: "bottom-left",
    });
  }

  const handleNewComment = async () => {
    if (!newComment) {
      ToastMessage("Error", "Comment cannot be empty", ToastStatus.ERROR);
      return;
    }
    try {
      setIsCommentAdding(true);
      const { data } = await axios.post(`/api/feedback/create-comment`, {
        feedbackId: singleFeedback._id,
        content: newComment,
        senderId: user.userId,
      });
      dispatch(addComments(data));
      dispatch(populateSingleFeedback(id));
      setNewComment("");
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    } finally {
      setIsCommentAdding(false);
    }
  };

  useEffect(() => {
    (async () => {
      dispatch(populateSingleFeedback(id));
      if (!singleFeedback._id) {
        const { data } = await axios.get(`/api/feedback/${id}`);
        dispatch(populateThroughApi(data.data));
      }
    })();
  }, [id]);

  useEffect(() => {
    if (singleFeedback._id) {
      singleFeedback?.comment?.forEach(
        (comment: CommentObject, index: number) => {
          setCommentsInput((commentsInput: any) => [
            ...commentsInput,
            {
              content: "",
              index,
              isReply: false,
              isEdit: false,
            },
          ]);
          setCommentArray((commentsInput: any) => [
            ...commentsInput,
            {
              content: "",
              index,
              isReply: false,
              isEdit: false,
            },
          ]);
        }
      );
    }
  }, [singleFeedback]);

  return (
    <Flex
      maxW={"800px"}
      w="100%"
      margin="0 auto"
      p={{ base: "0", sm: 5 }}
      flexDirection="column"
    >
      {/* go back and edit button */}
      <Stack align={"center"} w="100%" p={{ base: "10px" }} direction={"row"}>
        <GoBack />
        <Spacer />
        {user.userId === singleFeedback?.user?._id && (
          <Button
            onClick={() => navigate(`/feedback/edit/${id}`)}
            size="sm"
            background="blue.100"
            color={"white.100"}
            _hover={{ background: "blue.200" }}
            variant="solid"
          >
            Edit Feedback
          </Button>
        )}
      </Stack>
      <Box
        overflowX={"hidden"}
        className="single_feedback_height"
        overflowY={"auto"}
      >
        <Box mt="1rem" w="100%">
          <Suspense fallback={<p>loading...</p>}>
            <FeedbackContainer onOpen={onOpen} feed={singleFeedback} />
          </Suspense>
        </Box>

        {/* comment section */}
        <Flex
          mt={"1rem"}
          flexDir={"column"}
          className="comment_section"
          w={"100%"}
        >
          {/* comment section container */}
          <Stack
            borderRadius={"10px"}
            bg="white.100"
            p={{ base: "1rem", sm: "1rem 2rem" }}
            direction={"column"}
          >
            <Text fontSize="18px" mb="10px" color="black.200" fontWeight="bold">
              {CountComment(singleFeedback?.comment)} Comments
            </Text>

            <VStack spacing={4}>
              {singleFeedback.comment &&
                singleFeedback.comment.length > 0 &&
                singleFeedback.comment.map(
                  (com: CommentObject, index: number) => {
                    return (
                      <CommentContainer
                        key={com._id}
                        singleFeedback={singleFeedback}
                        index={index}
                        com={com}
                        setCommentsInput={setCommentsInput}
                        commentsInput={commentsInput[index]}
                        commentArray={commentArray}
                      />
                    );
                  }
                )}
            </VStack>
          </Stack>
          {/* add a comment */}
          <Stack
            borderRadius={"10px"}
            w="100%"
            bg="white"
            p={{ base: "1rem", sm: "1rem 2rem" }}
            direction={"column"}
            spacing={4}
            mt={"1rem"}
          >
            <Text as="h3" fontSize="18px" color="black.200" fontWeight="bold">
              Add comment
            </Text>
            <CommentTextArea
              value={newComment}
              handleCount={handleCount}
              handleChange={(e) => setNewComment(e.target.value)}
            />
            <Stack direction={"row"} w="100%">
              <Text color="black.300" fontSize={"15px"}>
                {charactersRemaining} characters left
              </Text>
              <Spacer />
              <Button
                onClick={handleNewComment}
                isLoading={isCommentAdding}
                loadingText="posting comment"
                size="sm"
                background="purple.100"
                _hover={{ background: "purple.200" }}
                variant="solid"
                color="white"
              >
                Post Comment
              </Button>
            </Stack>
          </Stack>
        </Flex>

        {/* Modal wrapper component */}
        <ModalWrapper
          email={user.email}
          isOpen={isOpen}
          onClose={onClose}
          User={user}
        />
      </Box>
    </Flex>
  );
};

export default SingleFeedback;
