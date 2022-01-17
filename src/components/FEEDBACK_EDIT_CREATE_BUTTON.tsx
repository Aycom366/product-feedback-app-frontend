import { Button, Flex, Box, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {
  edit?: boolean;
  feedbackHandler: () => void;
  cancelHandler?: () => void;
  isSubmitting?: boolean;
  deleteFeedback?: () => void;
  isDeleting?: boolean;
}

const FEEDBACK_EDIT_CREATE_BUTTON = ({
  edit,
  feedbackHandler,
  cancelHandler,
  isDeleting,
  deleteFeedback,
  isSubmitting,
}: Props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      flexDirection={{ base: "column", sm: "row" }}
      mt="2rem"
      w="100%"
    >
      {edit ? (
        <Box w="100%">
          <Button
            _hover={{ bg: "" }}
            w={{ base: "100%", sm: "auto" }}
            color="white.100"
            bg="red.100"
            loadingText="Deleting..."
            loading={isDeleting}
            mb={{ base: ".5rem" }}
            onClick={deleteFeedback}
            padding={{ base: "10px 0", sm: "10px 20px" }}
          >
            Delete
          </Button>
        </Box>
      ) : (
        <Box w="100%"></Box>
      )}

      <Stack direction={{ base: "column-reverse", sm: "row" }}>
        <Button
          onClick={cancelHandler}
          _hover={{ bg: "black.100" }}
          color="white.100"
          bg={"black.200"}
        >
          Cancel
        </Button>
        <Button
          _hover={{ bg: "purple.200" }}
          color="white.100"
          bg={"purple.100"}
          onClick={feedbackHandler}
          isLoading={isSubmitting}
          loadingText={edit ? "Updating..." : "Creating..."}
        >
          {edit ? "Save changes" : "Add Feedback"}
        </Button>
      </Stack>
    </Flex>
  );
};

export default FEEDBACK_EDIT_CREATE_BUTTON;
