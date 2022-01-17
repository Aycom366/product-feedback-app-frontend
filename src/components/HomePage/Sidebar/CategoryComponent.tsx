import { Box, Flex } from "@chakra-ui/react";
import GetWidths from "../../../utils/GetWidths";
import { Category } from "../../../utils/Category";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store";
import { currentCategory } from "../../../Redux/slices/settings";
import { Feedback } from "../../../Redux/model";
import { feedbackCategoryChange } from "../../../Redux/slices/feedbackSlice";

interface ActiveFeedback {
  activeFeedback?: Feedback[];
  setIsSidebarActive: React.Dispatch<React.SetStateAction<Boolean>>;
}

const CategoryComponent = ({
  activeFeedback,
  setIsSidebarActive,
}: ActiveFeedback) => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.generalSettings);

  return (
    <Flex
      h="auto"
      flexWrap={"wrap"}
      p={5}
      w="100%"
      bg="white"
      borderRadius={10}
      marginTop={GetWidths(["0", "0", "1rem"])}
      marginBottom={GetWidths(["2rem", "0", "1rem"])}
      mr={GetWidths(["0", "1rem", "0"])}
    >
      <Box flexWrap={"wrap"} height={"auto"}>
        {Category.map((item) => (
          <button
            onClick={() => {
              dispatch(currentCategory(item.name));
              dispatch(feedbackCategoryChange({ category: item.name }));
              setIsSidebarActive(false);
            }}
            key={item.id}
            className={`category_button ${
              item.name === category.name && "category_active"
            }`}
          >
            {item.name}
          </button>
        ))}
      </Box>
    </Flex>
  );
};

export default CategoryComponent;
