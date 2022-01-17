import { Center, Text, Button, Grid, Image, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
const image = require("../../../empty.png");

const EmptyFeedback = () => {
  const navigate = useNavigate();
  return (
    <Center
      className="main_content_wrapper_empty"
      w="100%"
      borderRadius={"10px"}
      bg="white"
      p={{ base: "1rem", sm: "1rem 0" }}
    >
      <Grid
        gridRowGap={"2rem"}
        maxW={"500px"}
        m={"0 auto"}
        w="100%"
        placeItems={"center"}
      >
        <GridItem>
          <Image src={image} alt="No Feedback" />
        </GridItem>
        <GridItem>
          <Grid gridRowGap={"1rem"}>
            <GridItem>
              <Center>
                <Text color="black.200" fontWeight={700} fontSize="xl">
                  There is no Feedback yet
                </Text>
              </Center>
            </GridItem>
            <GridItem>
              <Center>
                <Text color="black.300" textAlign={"center"}>
                  Got a suggestion? Found a bug that needs to be squashed? We
                  love hearing about new ideas to improve our app.
                </Text>
              </Center>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Button
            onClick={() => navigate("/create")}
            size="md"
            color={"white"}
            leftIcon={<AiOutlinePlus />}
            background="purple.100"
            _hover={{ background: "purple.200" }}
            variant="solid"
          >
            Add Feedback
          </Button>
        </GridItem>
      </Grid>
    </Center>
  );
};

export default EmptyFeedback;
