/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Heading, Box, VStack, Container } from "@chakra-ui/react";
import GoBack from "../components/GoBack";
import { ImPlus } from "react-icons/im";
import InputField from "../components/InputField";
import React, { useState, useEffect } from "react";
import SelectField from "../components/SelectField";
import TextAreaField from "../components/TextAreaField";
import FEEDBACK_EDIT_CREATE_BUTTON from "../components/FEEDBACK_EDIT_CREATE_BUTTON";
import { useToast } from "@chakra-ui/react";
import { ToastStatus } from "../utils/ToastStatus";
import { useDispatch, useSelector } from "react-redux";
import { removeFeedback, updateFeedback } from "../Redux/slices/feedbackSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../Redux/store";
import { AddFeedback } from "../Redux/model";
import { Category } from "../utils/Category";
import { Status } from "../utils";
import SelectFieldStatus from "../components/SelectFieldStatus";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AddFeedback>({
    feedbackTitle: "",
    feedbackCategory: "Feature",
    feedbackDetails: "",
    feedbackStatus: "",
  });
  const [feedbackTit, setfeedbackTit] = useState("");
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [isStatusDropdown, setisStatusDropdown] = useState(false);
  const { activeFeedback } = useSelector((state: RootState) => state.feedback);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const singleFeedback = activeFeedback.find(
      (feedback) => feedback._id === id
    );
    if (singleFeedback) {
      setfeedbackTit(singleFeedback?.feedbackTitle!);
      setFormData({
        feedbackTitle: singleFeedback?.feedbackTitle!,
        feedbackCategory: singleFeedback?.feedbackCategory!,
        feedbackDetails: singleFeedback?.feedbackDetails!,
        feedbackStatus: singleFeedback?.feedbackStatus,
      });
    }
  }, [id, activeFeedback]);

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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const feedbackHandler = async () => {
    if (!formData.feedbackDetails || !formData.feedbackTitle) {
      ToastMessage("Error", "All Fields are required", ToastStatus.ERROR);
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.patch(`/api/feedback/${id}`, formData);
      ToastMessage("Sucess", data.msg, ToastStatus.SUCCESS);

      dispatch(updateFeedback({ data: data.data, feedbackId: id }));
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteFeedback = async () => {
    try {
      setIsDeleting(true);
      const { data } = await axios.delete(`/api/feedback/${id}`);
      ToastMessage("Sucess", data.msg, ToastStatus.SUCCESS);
      dispatch(removeFeedback({ feedbackId: id }));
      navigate("/");
    } catch (error: any) {
      ToastMessage("Error", error.response.data.msg, ToastStatus.ERROR);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelHandler = () => navigate(-1);

  return (
    <Container>
      <Flex flexDir={"column"}>
        <GoBack />
        <Box overflowY={"auto"} h="85vh">
          <Flex
            mt={10}
            position={"relative"}
            borderRadius={10}
            w="100%"
            bg="white.100"
            flexDir={"column"}
            alignItems={"flex-start"}
            p={"3rem 2rem 1rem 2rem"}
          >
            <Flex
              bgGradient="linear(to-br, blue.200, purple.100,orange.100)"
              w="56px"
              h="56px"
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius="50%"
              color="white.100"
              position={"absolute"}
              top="-5%"
              left="8%"
            >
              <ImPlus />
            </Flex>
            <Heading mb={"40px"} fontSize={24} as="h2">
              Edit '{feedbackTit}'
            </Heading>
            <VStack w="100%">
              <InputField
                name="feedbackTitle"
                label={"Feedback Title"}
                headline="Add a short, descriptive headline"
                value={formData.feedbackTitle}
                handleChange={handleChange}
              />
              <SelectField
                name="feedbackCategory"
                label="Category"
                headline="Choose a category for your feedback"
                isDropDown={isDropDown}
                setIsDropDown={setIsDropDown}
                setFormData={setFormData}
                formData={formData}
                items={Category}
                currentValue={formData.feedbackCategory}
              />
              <SelectFieldStatus
                name="feedbackStatus"
                label="Update Status"
                headline="Change feature state"
                isDropDown={isStatusDropdown}
                setIsDropDown={setisStatusDropdown}
                setFormData={setFormData}
                formData={formData}
                items={Status}
                currentValue={formData.feedbackStatus}
              />

              <TextAreaField
                headline="Include any specific comments on what should be improved, added, etc."
                name="feedbackDetails"
                label="Feedback Detail"
                value={formData.feedbackDetails}
                handleChange={handleChange}
              />
            </VStack>
            <FEEDBACK_EDIT_CREATE_BUTTON
              edit={true}
              isDeleting={isDeleting}
              deleteFeedback={deleteFeedback}
              isSubmitting={isSubmitting}
              feedbackHandler={feedbackHandler}
              cancelHandler={cancelHandler}
            />
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Edit;
