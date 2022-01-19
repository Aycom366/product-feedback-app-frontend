import React from "react";
import {
  HStack,
  Flex,
  Avatar,
  Text,
  VStack,
  Button,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { CommentObject } from "../../Redux/model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { removeComment } from "../../Redux/slices/feedbackSlice";
import { instance } from "../../utils";

interface CommentHeaderProps {
  com: CommentObject;
  handleInputDisplayForComment: () => void;
  handleEditComment: () => void;
}

const CommentHeader = ({
  handleInputDisplayForComment,
  com,
  handleEditComment,
}: CommentHeaderProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleDelete = async () => {
    try {
      await instance.delete(`/api/feedback/delete-comment`, {
        data: {
          commentId: com._id,
        },
      });
      dispatch(removeComment({ feedback: com.feedback, comment: com._id }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSwitch = () => {
    handleInputDisplayForComment();
  };

  return (
    <HStack
      overflowX={"auto"}
      pb={"1rem"}
      h="100%"
      alignItems={"center"}
      w="100%"
      as="header"
    >
      <Flex alignItems={"center"} w="100%">
        <Avatar
          src={com.sender.pic}
          w="30px"
          h="30px"
          mr={{ base: ".5rem", sm: "1.5rem" }}
          size={"sm"}
        />
        <VStack spacing={0} alignItems={"flex-start"}>
          <Text fontWeight={700} color="black.200" fontSize={"13px"}>
            {com.sender.name}
          </Text>
          <Text color={"black.300"} fontSize={"13px"}>
            @{com.sender.email}
          </Text>
        </VStack>
      </Flex>
      <Spacer />
      <Stack alignItems={"center"} direction={"row"} spacing={3}>
        {user.email === com.sender.email && (
          <HStack spacing={4}>
            <AiFillEdit
              onClick={handleEditComment}
              style={{ color: "#647196" }}
            />
            <AiFillDelete style={{ color: "#647196" }} onClick={handleDelete} />
          </HStack>
        )}
        <Button
          variant={"outline"}
          fontWeight={600}
          color="blue.100"
          size={"xs"}
          onClick={handleSwitch}
        >
          Reply
        </Button>
      </Stack>
    </HStack>
  );
};

export default CommentHeader;
