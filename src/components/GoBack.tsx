import { Button, Flex } from "@chakra-ui/react";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface GoBackProps {
  iconColor?: string;
}

const GoBack = ({ iconColor }: GoBackProps) => {
  const navigate = useNavigate();
  return (
    <Flex justifyContent={"flex-start"}>
      <Button
        onClick={() => navigate(-1)}
        variant={"ghost"}
        leftIcon={
          <MdOutlineChevronLeft
            color={iconColor || "#4661E6"}
            fontSize={"1rem"}
          />
        }
        _hover={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Go Back
      </Button>
    </Flex>
  );
};

export default GoBack;
