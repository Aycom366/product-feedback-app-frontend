import { FormControl, Textarea } from "@chakra-ui/react";

interface CommentTextAreaProps {
  handleCount?: () => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  name?: string;
  index?: number;
  placeholder?: string;
}

const CommentTextArea = ({
  handleCount,
  handleChange,
  value,
  name,
  placeholder,
  index,
}: CommentTextAreaProps) => {
  return (
    <FormControl>
      <Textarea
        padding={5}
        fontSize={{ base: "13px", sm: "15px" }}
        placeholder={placeholder ? placeholder : "Type your comment here"}
        _placeholder={{ color: "black.500" }}
        border={"none"}
        _hover={{ border: "1px solid #4661E6", cursor: "pointer" }}
        color="black.200"
        bg="#F7F8FD"
        resize={"none"}
        name={name}
        index={index}
        height={"100px"}
        maxLength={250}
        onKeyUp={handleCount}
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default CommentTextArea;
