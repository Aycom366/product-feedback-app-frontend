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
import { CommentObject, SubCommentObject } from "../../Redux/model";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { removeSubComment } from "../../Redux/slices/feedbackSlice";
import { instance } from "../../utils";

interface CommentHeaderProps {
  subcom?: SubCommentObject;
  comObj?: CommentObject;
  handleInputDispayForSubcomment?: any;
}

const SubCommentHeader = ({
  subcom,
  comObj,
  handleInputDispayForSubcomment,
}: CommentHeaderProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleSubcommentDelete = async () => {
    try {
      const { data } = await instance.delete(
        `/api/feedback/delete-subcomment`,
        {
          data: {
            commentId: comObj?._id,
            subCommentId: subcom?._id,
            feedbackId: comObj?.feedback,
          },
        }
      );

      dispatch(removeSubComment(data.data));
    } catch (error: any) {
      console.log(error.response.data.msg);
    }
  };

  const handleSwitch = () => {
    handleInputDispayForSubcomment();
  };

  return (
    <HStack h="100%" alignItems={"center"} w="100%" as="header">
      <Flex alignItems={"center"} w="100%">
        <Avatar
          src={subcom?.sender?.pic}
          w={{ base: "20px", sm: "30px" }}
          h={{ base: "20px", sm: "30px" }}
          mr={{ base: ".5rem", sm: "1.5rem" }}
          size={"sm"}
        />
        <VStack spacing={0} alignItems={"flex-start"}>
          <Text fontWeight={700} color="black.200" fontSize={"13px"}>
            {subcom?.sender?.name}
          </Text>
          <Text color={"black.300"} fontSize={"13px"}>
            @{subcom?.sender?.email}
          </Text>
        </VStack>
      </Flex>
      <Spacer />
      <Stack alignItems={"center"} direction={"row"} spacing={3}>
        {user.email === subcom?.sender?.email && (
          <HStack fontSize={"13px"} spacing={4}>
            {/* <AiFillEdit style={{ color: "#647196" }} /> */}
            <AiFillDelete
              style={{ color: "#647196" }}
              onClick={handleSubcommentDelete}
            />
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

export default SubCommentHeader;
