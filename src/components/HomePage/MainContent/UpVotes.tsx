import { Text, Center, Flex } from "@chakra-ui/react";
import { HiChevronUp } from "react-icons/hi";
import { Feedback } from "../../../Redux/model";
import { currentUserUpVoted } from "../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

interface Feed {
  feed: Feedback;
  handleModal: () => void;
  roadmap?: boolean;
}

const UpVotes = ({ feed, handleModal, roadmap }: Feed) => {
  const users = useSelector((state: RootState) => state.user);
  return (
    <Flex
      onClick={handleModal}
      align={"center"}
      justify={"center"}
      direction={roadmap ? "row" : { base: "row", sm: "column" }}
      h={roadmap ? "32px" : { base: "32px", sm: "53px" }}
      w={roadmap ? "69px" : { base: "69px", sm: "40px" }}
      borderRadius={10}
      bg={currentUserUpVoted(feed.upvote, users) ? "blue.100" : "white.300"}
      _hover={{ bg: "white.600" }}
      cursor={"pointer"}
    >
      <Center
        color={
          currentUserUpVoted(feed.upvote, users) ? "white.100" : "blue.300"
        }
      >
        <HiChevronUp />
      </Center>
      <Center>
        <Text
          fontSize={"13px"}
          fontWeight={"700"}
          ml={roadmap ? "0.5rem" : { base: "0.5rem", sm: "0" }}
          color={
            currentUserUpVoted(feed.upvote, users) ? "white.100" : "black.200"
          }
        >
          {feed.upvote && feed.upvote.length > 0
            ? feed.upvote[0].user.length
            : 0}
        </Text>
      </Center>
    </Flex>
  );
};

export default UpVotes;
