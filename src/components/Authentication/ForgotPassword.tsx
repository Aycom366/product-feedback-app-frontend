import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Box,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { currentModalContent } from "../../Redux/slices/settings";
import { instance } from "../../utils";
import { ModalEnum } from "../../utils/ModalEnum";
import { ToastStatus } from "../../utils/ToastStatus";

const ForgotPassword = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");
  function ToastMessage(
    title: string,
    description: string,
    status: ToastStatus,
    duration?: number | 3000
  ) {
    return toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      position: "bottom-left",
    });
  }

  const handleSubmit = async (email: string) => {
    if (!email) {
      ToastMessage("Error", "Please fill all the fields", ToastStatus.ERROR);
      return;
    }

    try {
      setIsSending(true);
      const { data } = await instance.post(`/api/auth/forgot-password`, {
        email,
      });
      ToastMessage("Info", data.msg, ToastStatus.INFO, 9000);
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Flex w="100%" flexDirection="column">
      <VStack w="100%" p={5}>
        <Heading mb="2rem" fontWeight="400" size="lg">
          Forgot Password
        </Heading>
        <Box w="100%">
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </FormControl>
          <Button
            mt="2rem"
            bg="black.400"
            color="white.100"
            _hover={{ bg: "black.300" }}
            width="100%"
            loadingText="please wait..."
            size="sm"
            isLoading={isSending}
            onClick={() => handleSubmit(email)}
          >
            Get Reset Password Link
          </Button>
        </Box>
        <Flex py="10px" alignItems="center" justifyContent="center">
          <Text>Already have an account?</Text>
          <Button
            onClick={() => dispatch(currentModalContent(ModalEnum.LOGIN))}
            color="black.100"
            variant={"link"}
            ml={".5rem"}
          >
            Login
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default ForgotPassword;
