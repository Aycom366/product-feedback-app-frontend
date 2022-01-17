import {
  Flex,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import InProgress from "./InProgress";
import Live from "./Live";
import Planned from "./Planned";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { FeedbackStatus } from "../../utils";
import ModalWrapper from "../HomePage/MainContent/ModalWrapper";

const MainContent = () => {
  const { activeFeedback } = useSelector((state: RootState) => state.feedback);
  const user = useSelector((state: RootState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getStatusFromFeedback = (feedbackStatus: string) => {
    const feeds = activeFeedback.filter(
      (feed) => feed.feedbackStatus === feedbackStatus
    );
    if (feeds) return feeds;
    return [];
  };

  return (
    <Flex className="roadmap_height" overflowY={"auto"} w="100%">
      <SimpleGrid
        d={{ base: "none", sm: "grid" }}
        w="100%"
        columns={3}
        spacing={5}
      >
        <Planned
          onOpen={onOpen}
          feeds={getStatusFromFeedback(FeedbackStatus.PLANNED)}
        />
        <InProgress
          onOpen={onOpen}
          feeds={getStatusFromFeedback(FeedbackStatus.IN_PROGRESS)}
        />
        <Live
          onOpen={onOpen}
          feeds={getStatusFromFeedback(FeedbackStatus.LIVE)}
        />
      </SimpleGrid>
      <Tabs isFitted w="100%" d={{ base: "block", sm: "none" }}>
        <TabList>
          <Tab
            opacity={"0.4"}
            color="black.200"
            fontWeight={700}
            _selected={{ opacity: 1, borderBottom: "3px solid #F49F85" }}
          >
            Planned ({getStatusFromFeedback(FeedbackStatus.PLANNED).length})
          </Tab>
          <Tab
            fontWeight={700}
            color="black.200"
            opacity={"0.4"}
            _selected={{ opacity: 1, borderBottom: "3px solid #AD1FEA" }}
          >
            In-Progress (
            {getStatusFromFeedback(FeedbackStatus.IN_PROGRESS).length})
          </Tab>
          <Tab
            fontWeight={700}
            color="black.200"
            opacity={"0.4"}
            _selected={{ opacity: 1, borderBottom: "3px solid #62BCFA" }}
          >
            Live ({getStatusFromFeedback(FeedbackStatus.LIVE).length})
          </Tab>
        </TabList>

        <TabPanels p={{ base: 1, sm: 3 }}>
          <TabPanel>
            <Planned
              onOpen={onOpen}
              feeds={getStatusFromFeedback(FeedbackStatus.PLANNED)}
            />
          </TabPanel>
          <TabPanel>
            <InProgress
              onOpen={onOpen}
              feeds={getStatusFromFeedback(FeedbackStatus.IN_PROGRESS)}
            />
          </TabPanel>
          <TabPanel>
            <Live
              onOpen={onOpen}
              feeds={getStatusFromFeedback(FeedbackStatus.LIVE)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal wrapper component */}
      <ModalWrapper
        email={user.email}
        isOpen={isOpen}
        onClose={onClose}
        User={user}
      />
    </Flex>
  );
};

export default MainContent;
