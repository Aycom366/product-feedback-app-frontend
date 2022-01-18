/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import Header from "../components/Authentication/VerifyEmail";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { baseURL } from "../utils";

const VerifyEmail = () => {
  const [error, setError] = useState({ status: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const queryValues = queryString.parse(search);

  const verifyEmailToken = async () => {
    setLoading(true);
    await axios
      .post(`/api/auth/verify-email`, {
        verificationToken: queryValues.token,
        email: queryValues.email,
      })
      .then((res) => console.log(res.data))
      .catch((err) => setError({ status: true, msg: err.response.data.msg }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    verifyEmailToken();
  }, []);

  if (loading) {
    return (
      <Header>
        <Box mt="1rem">
          <Heading size="lg">Loading...</Heading>
        </Box>
      </Header>
    );
  }

  if (error.status) {
    return (
      <Header>
        <Box px="1rem" mt="4rem">
          <Heading size="lg">{error.msg}</Heading>
        </Box>
      </Header>
    );
  }

  return (
    <Header>
      <Box px="1rem" mt="4rem">
        <Flex direction="column">
          <Heading fontWeight="400" size="lg">
            Account Verified
          </Heading>
          <Link to="/">
            <Button size="sm" color={"white.100"} mt="1rem" bg="black.400">
              Please Login
            </Button>
          </Link>
        </Flex>
      </Box>
    </Header>
  );
};

export default VerifyEmail;
