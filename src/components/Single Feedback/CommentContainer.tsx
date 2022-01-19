/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CommentObject, Feedback, SubCommentObject } from "../../Redux/model";
import {
  VStack,
  Text,
  Flex,
  Avatar,
  Divider,
  Box,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../../styled";

import CommentHeader from "./CommentHeader";
import CommentTextArea from "./CommentTextArea";
import Subcomment from "./Subcomment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { ToastStatus } from "../../utils/ToastStatus";
import { addSubComments } from "../../Redux/slices/feedbackSlice";
import axios from "axios";

interface CommentInputProps {
  content: string;
  index: number;
  isReply: boolean;
  isEdit: boolean;
}
interface CommentContainerProps {
  com: CommentObject;
  singleFeedback: Feedback;
  index: number;
  commentObject?: CommentObject; //used for subcomment component
  setCommentsInput: React.Dispatch<any>;
  commentsInput?: CommentInputProps;
  commentArray?: any;
}

const CommentContainer = ({
  com,
  singleFeedback,
  index,
  commentsInput,
  setCommentsInput,
  commentArray,
}: CommentContainerProps) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isSubcommentAdding, setisSubcommentAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  //*************SubComments States***************/
  const [subcommentInput, setSubcommentInput] = useState<any>([]);
  const [subcommentArray, setSubcommentArray] = useState<any>(subcommentInput);

  //setting up variables to make subcomment workks
  useEffect(() => {
    if (com._id) {
      com?.subcomment?.forEach(
        (subcomment: SubCommentObject, index: number) => {
          setSubcommentInput((subcommentInput: any) => [
            ...subcommentInput,
            { content: "", index, isReply: false },
          ]);
          setSubcommentArray((subcommentInput: any) => [
            ...subcommentInput,
            { content: "", index, isReply: false },
          ]);
        }
      );
    }
  }, [com]);
  //*************EndSubComments States***************/

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const index = e.currentTarget?.getAttribute("index");
    const newCom = [...commentArray];
    newCom[Number(index)][name] = value;
    setCommentsInput(newCom);
  };

  const handleInputDisplayForComment = () => {
    const newCom = [...commentArray];
    newCom[index].isReply = !newCom[index].isReply;
    setCommentsInput(newCom);
  };

  const handleEditComment = () => {
    const newCom = [...commentArray];
    newCom[index].isReply = true;
    newCom[index].content = com.content;
    newCom[index].isEdit = true;
    setCommentsInput(newCom);
  };

  const cancelEditComment = () => {
    const newCom = [...commentArray];
    newCom[index].isReply = false;
    newCom[index].content = "";
    newCom[index].isEdit = false;
    setCommentsInput(newCom);
  };

  const postSubcomment = async () => {
    if (!commentsInput?.content) {
      return;
    }

    try {
      commentsInput.isEdit ? setIsEditing(true) : setisSubcommentAdding(false);

      const { data } = await axios({
        method: commentsInput.isEdit ? "PATCH" : "POST",
        url: commentsInput.isEdit
          ? `/api/feedback/update-comment`
          : `/api/feedback/create-subcomment`,
        data: commentsInput.isEdit
          ? { commentId: com._id, content: commentsInput.content }
          : {
              commentId: com._id,
              content: commentsInput?.content,
              senderId: user.userId,
              replyingToId: com.sender._id,
            },
      });

      dispatch(addSubComments(data));
      const newCom = [...commentArray];
      newCom[index].isReply = false;
      newCom[index].isEdit = false;
      newCom[index].content = "";
      setCommentsInput(newCom);
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    } finally {
      setisSubcommentAdding(false);
      setIsEditing(false);
    }
  };

  return (
    <VStack h="100%" w="100%" as="section">
      {/* comments header */}
      <CommentHeader
        handleInputDisplayForComment={handleInputDisplayForComment}
        handleEditComment={handleEditComment}
        com={com}
      />

      {/* comments content */}
      <Flex w="100%" marginLeft="1rem">
        <Divider
          opacity={"0.6"}
          display={com.subcomment.length > 0 ? "block" : "none"}
          position={"relative"}
          bg="black.300"
          left={{ base: "4%", sm: "2.5%" }}
          orientation="vertical"
        />
        <Box mr={{ base: "0", sm: "1rem" }}>
          <Avatar visibility={"hidden"} width={"30px"} height="30px" />
        </Box>

        {/* comment information and input */}
        <Flex
          w="100%"
          borderBottom={`${
            index !== singleFeedback.comment.length - 1 && "1px solid #f1f1f1"
          } `}
          paddingBottom={`${index !== singleFeedback.comment && "1.5rem"} `}
          direction={"column"}
          mt={"1rem"}
        >
          <Text fontSize={{ base: "13px", sm: "15px" }} mb="1.5rem">
            {com.content}
          </Text>
          {/* input area for the parent comment */}
          {commentsInput?.isReply && (
            <Stack
              flex={1}
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              alignItems={"flex-start"}
              mb={"1.5rem"}
            >
              <CommentTextArea
                name="content"
                index={index}
                value={`${commentsInput?.content}`}
                handleChange={handleChange}
              />
              <Stack direction={"row"}>
                {" "}
                <Button
                  br="10px"
                  p={"10px"}
                  fontWeight="700"
                  color="white"
                  w="100px"
                  bg="#AD1FEA"
                  fontSize="13px"
                  hover_background="#8D1FEA"
                  onClick={postSubcomment}
                  disabled={isSubcommentAdding}
                >
                  {commentsInput.isEdit ? "Edit Reply" : "Post Reply"}
                </Button>
                {commentsInput.isEdit && (
                  <Button
                    br="10px"
                    p={"10px"}
                    fontWeight="700"
                    color="white"
                    w="100px"
                    bg="#d73737"
                    fontSize="13px"
                    onClick={cancelEditComment}
                    disabled={isEditing}
                  >
                    Cancel Edit
                  </Button>
                )}
              </Stack>
            </Stack>
          )}

          {/* subcomment */}
          {com.subcomment &&
            com.subcomment.length > 0 &&
            com.subcomment.map((subcom, index: number) => (
              <Subcomment
                comObj={com}
                subcom={subcom}
                key={subcom._id}
                index={index}
                setSubcommentInput={setSubcommentInput}
                subcommentArray={subcommentArray}
                subcommentInput={subcommentInput[index]}
                user={user}
              />
            ))}
        </Flex>
      </Flex>
    </VStack>
  );
};

export default CommentContainer;
