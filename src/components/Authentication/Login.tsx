import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Flex,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import { ChangeEvent, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ToastStatus } from "../../utils/ToastStatus";
import axios from "axios";
import { currentUser } from "../../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { currentModalContent } from "../../Redux/slices/settings";
import { ModalEnum } from "../../utils/ModalEnum";
import { baseURL } from "../../utils";

interface Props {
  onClose: () => void;
}

const Login = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const responseSuccessGoogle = async (data: any) => {
    try {
      const response: any = await axios.post("/api/auth/google-login", {
        tokenId: data?.tokenId,
      });
      dispatch(currentUser(response.data.data));
      ToastMessage("Success", response.msg, ToastStatus.SUCCESS);
      onClose();
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    }
  };

  const responseErrorGoogle = (response: object) => {
    console.log(response);
  };

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value: any =
      e.target.type === "files" ? e.target.files?.[0] : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      return ToastMessage(
        "Error",
        "Please fill all the fields",
        ToastStatus.ERROR
      );
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${baseURL}/api/auth/login`, formData);
      dispatch(currentUser(data.data));
      ToastMessage("Success", "Login Successful", ToastStatus.SUCCESS);
      onClose();
    } catch (error: any) {
      return ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      w="100%"
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
    >
      <FormControl w="100%" mb={3}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          type="email"
        />
      </FormControl>
      <FormControl w="100%" mb={1}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          type={!showPassword ? "text" : "password"}
        />
      </FormControl>
      <Stack w="100%" direction={"row"}>
        <FormControl>
          <Checkbox
            defaultChecked
            onChange={() => setShowPassword(!showPassword)}
          >
            show password
          </Checkbox>
        </FormControl>
        <Spacer />
        <Button
          onClick={() => {
            dispatch(currentModalContent(ModalEnum.FORGOT_PASSWORD));
          }}
          fontWeight={400}
          variant={"link"}
        >
          forgot password?
        </Button>
      </Stack>
      <Button
        onClick={handleSubmit}
        mt={4}
        color="white.100"
        variant={"solid"}
        bg="black.400"
        w="100%"
        _hover={{ bg: "black.300" }}
        isLoading={isSubmitting}
        loadingText="loggging in..."
      >
        Login
      </Button>
      <Text my={5} fontSize={"2xl"}>
        OR
      </Text>

      <GoogleLogin
        clientId={`797788470062-a2rvvf71q36j7r35d77p80uqp8u9v2ja.apps.googleusercontent.com`}
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            className="loginBtn loginBtn--google"
            onClick={renderProps.onClick}
          >
            Login with Google
          </button>
        )}
      />
    </Flex>
  );
};

export default Login;
