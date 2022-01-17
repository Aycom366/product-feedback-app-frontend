import { Stack, Flex, Skeleton } from "@chakra-ui/react";
import Content from "./Content";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import EmptyFeedback from "../MainContent/EmptyFeedback";

const MainContent = () => {
  const { activeFeedback, loading } = useSelector(
    (state: RootState) => state.feedback
  );

  return (
    <Flex
      as="section"
      marginTop={["0", "1rem", "0"]}
      background={"transparent"}
      flex={1}
      flexDir={"column"}
    >
      <Header />

      {loading ? (
        <Stack direction="column" p={"1rem"}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
          {activeFeedback && activeFeedback.length > 0 ? (
            <Content activeFeedback={activeFeedback} />
          ) : (
            <EmptyFeedback />
          )}
        </>
      )}
    </Flex>
  );
};

export default MainContent;
