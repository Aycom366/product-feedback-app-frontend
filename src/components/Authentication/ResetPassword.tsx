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
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentModalContent } from "../../Redux/slices/settings";
import { instance } from "../../utils";
import { ModalEnum } from "../../utils/ModalEnum";
import { ToastStatus } from "../../utils/ToastStatus";

interface Props {
  email?: string;
  token?: string;
}

const ResetPassword = ({ email, token }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    email,
    password: "",
    passwordToken: token,
  });
  const [showPassword, setShowPassword] = useState(false);

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

  interface Input {
    email?: string;
    password: string;
    token?: string;
  }

  const handleSubmit = async (resetPassword: Input) => {
    if (!resetPassword.password) {
      ToastMessage("Error", "Please fill all the fields", ToastStatus.ERROR);
      return;
    }

    try {
      setIsSending(true);
      const { data } = await instance.post(
        `/api/auth/reset-password`,
        resetPassword
      );
      ToastMessage("Success", data.msg, ToastStatus.SUCCESS, 9000);
      setResetPassword({ email: "", password: "", passwordToken: "" });
      navigate("/");
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  };

  return (
    <Flex w="100%" flexDirection="column">
      <VStack w="100%" p={5}>
        <Heading mb="2rem" fontWeight="400" size="lg">
          Reset Password
        </Heading>
        <Box w="100%">
          <FormControl id="email">
            <FormLabel>Password</FormLabel>
            <Input
              value={resetPassword.password}
              onChange={(e) => handleChange(e)}
              type={`${showPassword ? "text" : "password"}`}
              name="password"
            />
          </FormControl>
          <Checkbox
            mt={2}
            isChecked={showPassword}
            onChange={(e) => setShowPassword(!showPassword)}
          >
            show password
          </Checkbox>
          <Button
            mt="2rem"
            bg="black.400"
            color="white.100"
            _hover={{ bg: "black.300" }}
            width="100%"
            loadingText="please wait..."
            size="sm"
            isLoading={isSending}
            onClick={() => handleSubmit(resetPassword)}
          >
            Reset Password
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

export default ResetPassword;
