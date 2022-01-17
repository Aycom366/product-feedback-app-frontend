import { Stack, Text } from "@chakra-ui/react";

interface Props {
  feedbackStatus: string;
  feedbackStatusCount: number;
  feedbackStatusDetails: string;
}

const StatusHeader = ({
  feedbackStatus,
  feedbackStatusDetails,
  feedbackStatusCount,
}: Props) => {
  return (
    <Stack
      justifyContent={"flex-start"}
      height={"auto"}
      w="100%"
      mb={"1rem"}
      spacing={0}
      direction={"column"}
      color="black.200"
    >
      <Text fontWeight={700} fontSize={{ base: "18px" }} color={"black.100"}>
        {feedbackStatus} ({feedbackStatusCount})
      </Text>
      <Text
        fontWeight={400}
        fontSize={{ base: "", sm: "1rem" }}
        color={"black.300"}
      >
        {feedbackStatusDetails}
      </Text>
    </Stack>
  );
};

export default StatusHeader;
