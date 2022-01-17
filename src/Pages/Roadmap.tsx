import { Flex } from "@chakra-ui/react";
import Header from "../components/Roadmap/Header";
import MainContent from "../components/Roadmap/MainContent";

const Roadmap = () => {
  return (
    <Flex as="section" w="100%" flexDirection={"column"}>
      <Header />
      <MainContent />
    </Flex>
  );
};

export default Roadmap;
