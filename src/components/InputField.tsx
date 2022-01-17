import { FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import React, { InputHTMLAttributes, FC } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  headline?: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputProps> = ({
  name,
  label,
  headline,
  value,
  handleChange,
}) => {
  return (
    <FormControl mb={"24px"} w="100%">
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
      <Input
        w="100%"
        value={value}
        onChange={handleChange}
        name={name}
        id={name}
        _focus={{ border: "1px solid #4661E6 " }}
        type="text"
        border={"none"}
        bg={"white.200"}
      />
    </FormControl>
  );
};

export default InputField;
