import { BsFillChatFill } from "react-icons/bs";
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Feedback } from "../../../Redux/model";
import { CountComment } from "../../../utils";

interface Feed {
  feed: Feedback;
}

const Comment = ({ feed }: Feed) => {
  return (
    <Flex alignItems={"center"}>
      <Box as={BsFillChatFill} color={"white.500"} />
      <Text fontWeight={"500"} ml={2}>
        {CountComment(feed?.comment)}
      </Text>
    </Flex>
  );
};

export default Comment;
