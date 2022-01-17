import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import { checkColor } from "../../utils";

interface Props {
  feedbackStatus: string;
}

const StatusComponent = ({ feedbackStatus }: Props) => {
  return (
    <Flex
      p={5}
      pb={0}
      borderTop={`5px solid ${checkColor(feedbackStatus)}`}
      borderRadius={"5px 5px 0 0"}
      w="100%"
      bg="white"
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Box
          height="10px"
          bg={checkColor(feedbackStatus)}
          borderRadius={"100%"}
          w="10px"
        ></Box>
        <Text
          fontWeight={400}
          fontSize={{ base: "", sm: "1rem" }}
          color={"black.300"}
        >
          {feedbackStatus}
        </Text>
      </Stack>
    </Flex>
  );
};

export default StatusComponent;
