import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { theme } from "./themes/theme";
import { BrowserRouter } from "react-router-dom";
import { getUser } from "./Redux/slices/userSlice";
import { fetchFeedbacks } from "./Redux/slices/feedbackSlice";

store.dispatch(getUser());
store.dispatch(fetchFeedbacks());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
