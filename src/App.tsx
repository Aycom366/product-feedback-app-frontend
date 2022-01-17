/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./Pages/Create";
import HomePage from "./Pages/HomePage";
import Roadmap from "./Pages/Roadmap";
import { useDispatch, useSelector } from "react-redux";
import { currentWidth } from "./Redux/slices/Width";
import SingleFeedback from "./Pages/SingleFeedback";
import VerifyEmail from "./Pages/VerifyEmail";
import { RootState } from "./Redux/store";
import { Center, Button, Text, VStack } from "@chakra-ui/react";
import Edit from "./Pages/Edit";

function App() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state: RootState) => state.feedback);

  //geting width of the window
  useEffect(() => {
    function setWidth() {
      dispatch(currentWidth(window.innerWidth));
    }
    window.addEventListener("resize", setWidth);
    return () => window.removeEventListener("resize", setWidth);
  }, []);

  if (error && !loading) {
    return (
      <Center h="100vh" w="100vw">
        <VStack>
          <Text fontWeight={500}>
            The App is having trouble connecting to the server
          </Text>
          <Button
            onClick={() => window.location.reload()}
            _hover={{ bg: "black.300" }}
            bg="black.200"
            color="white.100"
          >
            Reload
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <div className="App">
      <div className="App_container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback/:id" element={<SingleFeedback />} />
          <Route path="create" element={<Create />} />
          <Route path="/feedback/edit/:id" element={<Edit />} />
          <Route path="/user/verify-email" element={<VerifyEmail />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route
            path="*"
            element={
              <main>
                <p>Nothing here</p>
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
