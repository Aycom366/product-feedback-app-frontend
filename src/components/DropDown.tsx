import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { IoIosCheckmark } from "react-icons/io";

interface Props {
  isDropDown?: boolean;
  arrayLoops?: any[];
  CurrentValue?: string;
  event: () => void;
  item: any;
}

const DropDown = ({ item, CurrentValue, event }: Props) => {
  return (
    <Box w="100%">
      <Button
        onClick={event}
        variant={"ghost"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        h="100%"
        p={"10px 20px"}
        cursor={"pointer"}
        _hover={{ color: "purple.200" }}
        color={"black.300"}
      >
        <Text fontWeight={"400"} fontSize={".8rem"}>
          {item.name}
        </Text>
        {item.name === CurrentValue && (
          <IoIosCheckmark style={{ color: "#AD1FEA", fontSize: "1.5rem" }} />
        )}
      </Button>
      <Divider />
    </Box>
  );
};

export default DropDown;
