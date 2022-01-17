import {
  Box,
  FormControl,
  FormLabel,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes, FC } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import DropDown from "./DropDown";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  headline?: string;
  formData: any;
  label?: string;
  items?: any;
  isDropDown: boolean;
  currentValue?: string;
  setIsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      feedbackTitle: string;
      feedbackCategory: string;
      feedbackDetails: string;
      feedbackStatus?: string;
    }>
  >;
}

const SelectField: FC<InputProps> = ({
  name,
  label,
  items,
  headline,
  formData,
  currentValue,
  isDropDown,
  setIsDropDown,
  setFormData,
}) => {
  const handleFunctionalities = (category: string) => {
    setFormData({ ...formData, feedbackCategory: category });
    setIsDropDown(false);
  };

  return (
    <FormControl w="100%">
      <VStack mb={"1rem"} spacing={-2} alignItems={"flex-start"}>
        <FormLabel
          id={name}
          fontSize={"14px"}
          fontWeight={700}
          color={"black.200"}
        >
          {label}
        </FormLabel>
        <Text color="black.300" fontWeight="400">
          {headline}
        </Text>
      </VStack>
      <Box mb={"24px"} position={"relative"} w="100%">
        <Stack
          boxShadow={isDropDown ? "0px 0px 10px rgba(0, 0, 0, 0.1)" : "none"}
          onClick={() => setIsDropDown(!isDropDown)}
          alignItems={"center"}
          direction={"row"}
          fontSize={"md"}
          border={isDropDown ? "1px solid #4661E6 " : "none"}
          bg={"white.200"}
          p={"8px 1rem"}
          w="100%"
          borderRadius={"5px"}
        >
          <Text>{formData.feedbackCategory}</Text>
          <Spacer />
          {isDropDown ? (
            <BiChevronUp color="#4661E6" />
          ) : (
            <BiChevronDown color="#4661E6" />
          )}
        </Stack>
        <div
          className={`sort_dropdown_container category_width ${
            isDropDown && "show_drop_down show_category_drop_down"
          }`}
        >
          {items
            ?.filter((cat: any) => cat.name !== "All")
            ?.map((category: any) => (
              <DropDown
                event={() => handleFunctionalities(category.name)}
                CurrentValue={currentValue}
                key={category.id}
                item={category}
              />
            ))}
        </div>
      </Box>
    </FormControl>
  );
};

export default SelectField;
