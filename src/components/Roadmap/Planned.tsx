import { VStack } from "@chakra-ui/react";
import { Feedback } from "../../Redux/model";
import FeedbackContainer from "../FeedbackContainer";
import StatusComponent from "./StatusComponent";
import StatusHeader from "./StatusHeader";

interface Props {
  feeds: Feedback[];
  onOpen: () => void;
}

const Planned = ({ feeds, onOpen }: Props) => {
  return (
    <VStack spacing={4} as="section">
      <StatusHeader
        feedbackStatus="Planned"
        feedbackStatusCount={feeds.length}
        feedbackStatusDetails="Ideas prioritized for research"
      />
      {feeds &&
        feeds.length > 0 &&
        feeds.map((feed) => {
          return (
            <VStack w="100%" spacing={0} key={feed._id}>
              <StatusComponent feedbackStatus="Planned" />
              <FeedbackContainer roadmap onOpen={onOpen} feed={feed} />
            </VStack>
          );
        })}
    </VStack>
  );
};

export default Planned;
