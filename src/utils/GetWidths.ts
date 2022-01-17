import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const GetWidths = (size: string[]) => {
  const currentWidth = useSelector(
    (state: RootState) => state.currentWidth.width
  );
  if (currentWidth <= 600) {
    return size[0];
  } else if (currentWidth >= 600 && currentWidth <= 768) {
    return size[1];
  } else {
    return size[2];
  }
};

export default GetWidths;
