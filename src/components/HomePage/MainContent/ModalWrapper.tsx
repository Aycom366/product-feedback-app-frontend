/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@chakra-ui/react";
import AuthenticationModal from "../../Authentication/AuthenticationModal";

interface UserProps {
  userId?: string;
  name?: string;
  pic?: string;
  email?: string;
}

interface Props {
  email?: string;
  token?: string;
  User: UserProps;
  isOpen: boolean;
  onClose: () => void;
}

const ModalWrapper = ({ email, token, User, isOpen, onClose }: Props) => {
  return (
    <Box>
      {!User.email && (
        <AuthenticationModal
          email={email}
          token={token}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default ModalWrapper;
