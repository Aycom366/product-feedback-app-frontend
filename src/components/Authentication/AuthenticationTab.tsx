import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

interface Props {
  onClose: () => void;
}

const AuthenticationTab = ({ onClose }: Props) => {
  return (
    <Tabs colorScheme={"blackAlpha.400"} isFitted>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login onClose={onClose} />
        </TabPanel>
        <TabPanel>
          <Signup onClose={onClose} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AuthenticationTab;
