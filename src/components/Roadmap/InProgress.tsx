import { VStack } from "@chakra-ui/react";
import { Feedback } from "../../Redux/model";
import FeedbackContainer from "../FeedbackContainer";
import StatusComponent from "./StatusComponent";
import StatusHeader from "./StatusHeader";

interface Props {
  feeds: Feedback[];
  onOpen: () => void;
}

const InProgress = ({ feeds, onOpen }: Props) => {
  return (
    <VStack spacing={4} as="section">
      <StatusHeader
        feedbackStatus="In-Progress"
        feedbackStatusCount={feeds.length}
        feedbackStatusDetails="Currently being developed"
      />
      {feeds &&
        feeds.length > 0 &&
        feeds.map((feed) => {
          return (
            <VStack w="100%" spacing={0} key={feed._id}>
              <StatusComponent feedbackStatus="In-Progress" />
              <FeedbackContainer roadmap onOpen={onOpen} feed={feed} />
            </VStack>
          );
        })}
    </VStack>
  );
};

export default InProgress;
