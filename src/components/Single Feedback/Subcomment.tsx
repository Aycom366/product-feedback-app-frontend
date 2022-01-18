import React from "react";
import {
  VStack,
  Text,
  Flex,
  useToast,
  Avatar,
  Box,
  Stack,
} from "@chakra-ui/react";
import CommentTextArea from "./CommentTextArea";
import { CommentObject, SubCommentObject } from "../../Redux/model";
import { Button } from "../../styled";
import { useDispatch } from "react-redux";
import { ToastStatus } from "../../utils/ToastStatus";
import { addSubComments } from "../../Redux/slices/feedbackSlice";
import SubCommentHeader from "./SubCommentHeader";
import { instance } from "../../utils";

interface SubcommentInputProps {
  content: string;
  index: number;
  isReply: boolean;
}

interface SubcommentProps {
  subcom: SubCommentObject;
  comObj: CommentObject;
  index: number;
  setSubcommentInput: React.Dispatch<any>;
  subcommentInput: SubcommentInputProps;
  subcommentArray: any;
  user: any;
}

const Subcomment = ({
  subcom,
  index,
  subcommentArray,
  user,
  setSubcommentInput,
  subcommentInput,
  comObj,
}: SubcommentProps) => {
  //*************SubComments States***************/
  const [isSubcommentAdding, setisSubcommentAdding] = React.useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  //End of setting up variables to make subcomment workks

  //****************Subcomment functions****************/
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const index = e.target?.getAttribute("index");
    const newCom = [...subcommentArray];
    newCom[Number(index)][name] = value;
    setSubcommentInput(newCom);
  };

  const handleInputDispayForSubcomment = () => {
    const newCom = [...subcommentArray];
    newCom[index].isReply = !newCom[index].isReply;
    setSubcommentInput(newCom);
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

  const replySubcomment = async () => {
    if (!subcommentInput?.content) {
      return;
    }

    try {
      setisSubcommentAdding(true);
      const { data } = await instance.post(`/api/feedback/create-subcomment`, {
        commentId: comObj._id,
        content: subcommentInput?.content,
        senderId: user.userId,
        replyingToId: comObj.subcomment[index].sender._id,
      });
      dispatch(addSubComments(data));
      const newCom = [...subcommentArray];
      newCom[index].isReply = false;
      newCom[index].content = "";
      setSubcommentInput(newCom);
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    } finally {
      setisSubcommentAdding(false);
    }
  };

  //****************EndSubcomment functions****************/

  return (
    <div className="sub_comment_container">
      <VStack spacing={4} h="100%" as="section">
        {/* comments header */}

        <SubCommentHeader
          handleInputDispayForSubcomment={handleInputDispayForSubcomment}
          subcom={subcom}
          comObj={comObj}
        />

        {/* comments content */}
        <Flex w="100%" marginLeft="2rem">
          <Box mr={{ base: "0", sm: "1.5rem" }}>
            <Avatar
              display={{ base: "none", sm: "flex" }}
              visibility={"hidden"}
              width={"40px"}
              height="40px"
            />
          </Box>

          <Stack w="100%" spacing={4} direction={"column"}>
            <Text fontSize={{ base: "13px", sm: "15px" }}>
              <span
                style={{
                  fontWeight: 700,
                  color: "#ad1fea",
                  marginRight: "10px",
                }}
              >
                @{subcom.owner.email}
              </span>
              {subcom.content}
            </Text>
            {/* input area for the parent comment */}

            {subcommentInput?.isReply && (
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={4}
                alignItems={"flex-start"}
              >
                <Box w="100%" h="100%">
                  <CommentTextArea
                    placeholder={`Replying to ${subcom.sender.email}`}
                    name="content"
                    index={index}
                    value={`${subcommentInput?.content}`}
                    handleChange={handleChange}
                  />
                </Box>
                <Button
                  br="10px"
                  p={"10px"}
                  fontWeight="700"
                  color="white"
                  w="100px"
                  bg="#AD1FEA"
                  fontSize="13px"
                  hover_background="#8D1FEA"
                  onClick={replySubcomment}
                  disabled={isSubcommentAdding}
                >
                  Post Reply
                </Button>
              </Stack>
            )}
          </Stack>
        </Flex>
      </VStack>
    </div>
  );
};

export default Subcomment;
