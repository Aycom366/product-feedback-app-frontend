import React from "react";
import { Button } from "../../../styled";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Feedback } from "../../../Redux/model";
import { GetStatusCount } from "../../../utils/GetStatusCount";
import { useNavigate } from "react-router-dom";

interface ActiveFeedback {
  activeFeedback: Feedback[];
}

enum Status {
  PROGRESS = "In-Progress",
  PLANNED = "Planned",
  LIVE = "Live",
}

const Roadmap = ({ activeFeedback }: ActiveFeedback) => {
  const navigate = useNavigate();
  return (
    <Flex borderRadius={10} flexDir={"column"} w="100%" p={5} bg="white">
      <Flex w="100%" justifyContent={"space-between"} alignItems={"center"}>
        <Text
          color={"black.300"}
          fontSize={{ base: "xl", sm: "18px" }}
          fontWeight={"bold"}
        >
          Roadmap
        </Text>
        <Button
          onClick={() => navigate("/roadmap")}
          hover_color="#647196"
          fontSize="13px"
          fontWeight="600"
          p="0px"
          border
          color="blue.100"
        >
          View
        </Button>
      </Flex>
      <VStack mt={"1rem"}>
        <Flex color={"black.300"} justifyContent={"space-between"} w="100%">
          <Flex alignItems={"center"}>
            <Box
              bg={"orange.100"}
              w={"8px"}
              height="8px"
              borderRadius={"100%"}
              mr={"1rem"}
            ></Box>
            <Text fontSize="1rem" fontWeight="400">
              In-Progress
            </Text>
          </Flex>
          <Text fontWeight={"600"} color={"black.200"}>
            {GetStatusCount(activeFeedback, Status.PROGRESS)}
          </Text>
        </Flex>
        <Flex color={"black.300"} justifyContent={"space-between"} w="100%">
          <Flex alignItems={"center"}>
            <Box
              bg={"purple.100"}
              w={"8px"}
              height="8px"
              borderRadius={"100%"}
              mr={"1rem"}
            ></Box>
            <Text fontSize="1rem" fontWeight="400">
              Planned
            </Text>
          </Flex>
          <Text fontWeight={"600"} color={"black.200"}>
            {GetStatusCount(activeFeedback, Status.PLANNED)}
          </Text>
        </Flex>
        <Flex color={"black.300"} justifyContent={"space-between"} w="100%">
          <Flex alignItems={"center"}>
            <Box
              bg={"blue.200"}
              w={"8px"}
              height="8px"
              borderRadius={"100%"}
              mr={"1rem"}
            ></Box>
            <Text fontSize="1rem" fontWeight="400">
              Live
            </Text>
          </Flex>
          <Text fontWeight={"600"} color={"black.200"}>
            {GetStatusCount(activeFeedback, Status.LIVE)}
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Roadmap;
