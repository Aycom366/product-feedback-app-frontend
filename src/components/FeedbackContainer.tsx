import {
  Box,
  Flex,
  Heading,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Comment from "./HomePage/MainContent/Comment";
import UpVotes from "./HomePage/MainContent/UpVotes";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUpVote } from "../Redux/slices/feedbackSlice";
import { Feedback } from "../Redux/model";
import { RootState } from "../Redux/store";
import { baseURL } from "../utils";

interface Props {
  onOpen: () => void;
  feed: Feedback;
  roadmap?: boolean;
}

const FeedbackContainer = ({ onOpen, feed, roadmap }: Props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state: RootState) => state.user);

  const handleModal = async (feedbackId: string) => {
    //check to see if user is registered
    if (!user.email) {
      toast({
        title: "Warning",
        description: "You need to login to upvote",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      onOpen();
      return;
    }

    try {
      const { data } = await axios.patch(`/api/feedback/upvote`, {
        userId: user.userId,
        feedbackId,
      });
      const newData = {
        _id: data._id,
        feedback: data.feedback,
        user: data.user,
      };
      dispatch(updateUpVote(newData));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Flex
      as="section"
      bg="#Fff"
      w="100%"
      borderRadius={`${!roadmap && 10}`}
      p={roadmap ? "8px 16px" : { base: "24px 16px", sm: "24px 32px" }}
      transition={"all 0.3s ease-in-out"}
      _hover={{
        position: "relative",
        top: "-.5%",
      }}
    >
      {/* Upvotes */}
      <Box d={roadmap ? "none" : { base: "none", sm: "flex" }} h="100%">
        <UpVotes handleModal={() => handleModal(feed._id)} feed={feed} />
      </Box>
      {/* Feedback Informations and commments container */}
      <Flex
        w="100%"
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        ml={roadmap ? 0 : { base: 0, sm: 10 }}
        flex={1}
        flexDirection={roadmap ? "column" : { base: "column", sm: "row" }}
      >
        {/* Feedback Information */}
        <VStack
          onClick={() => navigate(`/feedback/${feed._id}`)}
          w="100%"
          alignItems={"flex-start"}
        >
          <Heading fontSize={"18px"} as="h5">
            {feed.feedbackTitle}
          </Heading>
          <Text size="lg">{feed.feedbackDetails}</Text>
          <Tag size={"md"} variant="solid" color={"blue.100"} bg="white.300">
            {feed.feedbackCategory}
          </Tag>
        </VStack>

        {/* Comment container */}
        <Box mt={"10px"} d={roadmap ? "none" : { base: "none", sm: "flex" }}>
          <Comment feed={feed} />
        </Box>
        <Flex
          w="100%"
          mt={4}
          justifyContent={"space-between"}
          alignItems={"center"}
          d={roadmap ? "flex" : { base: "flex", sm: "none" }}
        >
          <UpVotes
            roadmap
            handleModal={() => handleModal(feed._id)}
            feed={feed}
          />

          <Comment feed={feed} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FeedbackContainer;
