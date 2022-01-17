import { Stack } from "@chakra-ui/react";
import { Feedback } from "../../../Redux/model";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useDisclosure } from "@chakra-ui/react";
import ModalWrapper from "./ModalWrapper";
import FeedbackContainer from "../../FeedbackContainer";

interface ActiveFeedback {
  activeFeedback: Feedback[];
}

const Content = ({ activeFeedback }: ActiveFeedback) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useSelector((state: RootState) => state.user);

  return (
    <Stack
      direction="column"
      spacing={4}
      as="section"
      className="main_content_wrapper"
      overflowY={"auto"}
      p={{ base: "1rem", sm: "1rem 0" }}
    >
      {activeFeedback.map((feed) => {
        return <FeedbackContainer onOpen={onOpen} key={feed._id} feed={feed} />;
      })}

      {/* Modal wrapper component */}
      <ModalWrapper
        email={user.email}
        isOpen={isOpen}
        onClose={onClose}
        User={user}
      />
    </Stack>
  );
};

export default Content;
