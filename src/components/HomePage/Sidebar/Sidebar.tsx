import { Flex } from "@chakra-ui/react";
import Roadmap from "./Roadmap";
import GetWidths from "../../../utils/GetWidths";
import CategoryComponent from "./CategoryComponent";
import Header from "./Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const Sidebar = () => {
  const [isSidebarActive, setIsSidebarActive] = useState<Boolean>(false);
  const { activeFeedback } = useSelector((state: RootState) => state.feedback);

  return (
    <Flex
      as="aside"
      className="sidebar_wrapper"
      h={GetWidths(["auto", "178px", "100%"])}
      w={GetWidths(["100%", "100%", "255px"])}
      mr={GetWidths(["0", "0", "1rem"])}
      justifyContent={"space-between"}
      position={"relative"}
    >
      {/* header */}
      <Header
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
      />

      {/* content */}
      <div className={`overlay ${isSidebarActive && "show_overlay"}`}></div>
      <article
        className={`sidebar_category ${
          isSidebarActive && "show_sidebar_catgory"
        }`}
      >
        <CategoryComponent
          setIsSidebarActive={setIsSidebarActive}
          activeFeedback={activeFeedback}
        />
        <Roadmap activeFeedback={activeFeedback} />
      </article>
    </Flex>
  );
};

export default Sidebar;
