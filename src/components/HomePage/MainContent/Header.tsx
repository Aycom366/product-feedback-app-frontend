/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  useDisclosure,
  Box,
  Tooltip,
  Avatar,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { GiDeadEye } from "react-icons/gi";
import { Button as Buttons } from "../../../styled";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import GetWidths from "../../../utils/GetWidths";
import { Sorting } from "../../../utils/Sort";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store";
import {
  currentModalContent,
  currentSorting,
} from "../../../Redux/slices/settings";
import { useNavigate, useLocation } from "react-router-dom";
import ModalWrapper from "./ModalWrapper";
import queryString from "query-string";
import { ModalEnum } from "../../../utils/ModalEnum";
import DropDown from "../../DropDown";
import { useToast } from "@chakra-ui/react";
import { logout } from "../../../Redux/slices/userSlice";
import { sortedFeedback } from "../../../Redux/slices/feedbackSlice";
import { instance } from "../../../utils";

const Header = () => {
  interface Props {
    email?: string;
    token?: string;
  }

  const Logout = async () => {
    try {
      const { data } = await instance.post(`/api/auth/logout`);
      dispatch(logout());
      toast({
        title: "Sucess",
        description: data.msg,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const navigate = useNavigate();
  const { search } = useLocation();
  const params: Props = queryString.parse(search);
  const toast = useToast();
  const User = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Sort = useSelector((state: RootState) => state.generalSettings.sort);
  const { activeFeedback } = useSelector((state: RootState) => state.feedback);

  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  //set the content of modal to reset password from login
  useEffect(() => {
    if (params.email && params.token) {
      dispatch(currentModalContent(ModalEnum.RESET_PASSWORD));
    }
  }, []);

  //change sortings value and sorting container
  const handleFunctionalities = (sort: any) => {
    dispatch(currentSorting(sort.name));
    dispatch(sortedFeedback(sort.name));
    setIsDropDown(false);
  };

  //dispatch the sortedfeedback on component mount
  useEffect(() => {
    dispatch(sortedFeedback(Sort));
  }, [activeFeedback]);

  //reset password incoming
  useEffect(() => {
    if (params.email) {
      onOpen();
    }
  }, [params.email]);

  return (
    <>
      <Flex
        bg="black.400"
        w="100%"
        justifyContent={"space-between"}
        h="72px"
        as="header"
        borderRadius={{ base: "0", sm: 10 }}
        color={"white.100"}
        p="0 10px"
      >
        {/* sugestions and sorting */}
        <Flex>
          {/* suggestions */}
          <Flex
            marginRight={"2rem"}
            display={{ base: "none", md: "flex" }}
            alignItems={"center"}
          >
            <GiDeadEye />
            <span style={{ fontWeight: "600", marginLeft: "10px" }}>
              {activeFeedback && activeFeedback.length} suggestions
            </span>
          </Flex>
          {/* sorting */}
          <Flex
            fontSize={GetWidths(["13px", "14px", "14px"])}
            alignItems={"center"}
            position={"relative"}
          >
            <span>Sort by :</span>
            <Stack
              onClick={() => setIsDropDown(!isDropDown)}
              spacing={"0"}
              alignItems={"center"}
              direction={"row"}
            >
              <Buttons
                fontSize={GetWidths(["13px", "14px", "14px"])}
                fontWeight="700"
                color={"white.100"}
              >
                {Sort}
              </Buttons>
              {isDropDown ? <HiChevronDown /> : <HiChevronUp />}
            </Stack>

            {/* dropdown container */}
            <div
              className={`sort_dropdown_container ${
                isDropDown && "show_drop_down"
              }`}
            >
              {Sorting.map((sort, index) => (
                <DropDown
                  key={index}
                  event={() => handleFunctionalities(sort)}
                  item={sort}
                  CurrentValue={Sort}
                />
              ))}
            </div>
          </Flex>
        </Flex>

        {/* Feedback Button */}
        <Flex alignItems={"center"}>
          <Button
            onClick={() => navigate("/create")}
            size="sm"
            leftIcon={<AiOutlinePlus />}
            background="purple.100"
            _hover={{ background: "purple.200" }}
            variant="solid"
          >
            Add Feedback
          </Button>

          {/* Avatar section */}
          <Box>
            <Tooltip label={`${User.email ? "Logout" : "Login"}`}>
              <Avatar
                onClick={User.email ? Logout : onOpen}
                src={User?.pic}
                ml={2}
                size="xs"
              />
            </Tooltip>
          </Box>

          <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            User={User}
            email={params.email}
            token={params.token}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
