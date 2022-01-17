import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import { ChangeEvent, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { currentUser } from "../../Redux/slices/userSlice";
import { ToastStatus } from "../../utils/ToastStatus";
import { useDispatch } from "react-redux";
import { baseURL } from "../../utils";

interface Props {
  onClose: () => void;
}

const Signup = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface Forms {
    email: string;
    password: string;
    name: string;
    pic?: File;
  }

  const [forms, setforms] = useState<Forms>({
    name: "",
    email: "",
    password: "",
    pic: undefined,
  });

  const ResetInputs = () => {
    setforms({ name: "", email: "", password: "", pic: undefined });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setforms({ ...forms, [name]: value });
  };

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setforms({ ...forms, pic: file });
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

  const responseSuccessGoogle = async (data: any) => {
    try {
      const response: any = await axios.post(
        `${baseURL}/api/auth/google-login`,
        {
          tokenId: data?.tokenId,
        }
      );
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

  const handleSubmit = async () => {
    if (!forms.name || !forms.email || !forms.password) {
      return ToastMessage(
        "Error",
        "Please fill all the fields",
        ToastStatus.ERROR
      );
    }
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", forms.name);
      formData.append("email", forms.email);
      formData.append("password", forms.password);
      formData.append("pic", forms.pic as File);
      const { data } = await axios.post("/api/auth/register", formData);
      ToastMessage("Info", data.msg, ToastStatus.INFO);
      ResetInputs();
      onClose();
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR, 5000);
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
      <FormControl mb={3}>
        <FormLabel htmlFor="email">Name</FormLabel>
        <Input
          value={forms.name}
          id="name"
          name="name"
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          value={forms.email}
          id="email"
          name="email"
          type="email"
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel htmlFor="pic">Pic</FormLabel>
        <Input
          accept="image/*"
          onChange={(e) => imageChange(e)}
          id="pic"
          name="pic"
          type="file"
        />
      </FormControl>
      <FormControl mb={1}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          value={forms.password}
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
        />
      </FormControl>
      <FormControl>
        <Checkbox
          isChecked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        >
          show password
        </Checkbox>
      </FormControl>
      <Button
        onClick={handleSubmit}
        mt={4}
        color="white.100"
        variant={"solid"}
        bg="black.400"
        w="100%"
        _hover={{ bg: "black.300" }}
        isLoading={isSubmitting}
        loadingText="submitting..."
      >
        Signup
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
            Signup with Google
          </button>
        )}
      />
    </Flex>
  );
};

export default Signup;
