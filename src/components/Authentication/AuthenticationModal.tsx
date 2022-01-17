import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import AuthenticationTab from "./AuthenticationTab";
import { ModalEnum } from "../../utils/ModalEnum";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  token?: string;
}

const AuthenticationModal = ({ isOpen, onClose, email, token }: Props) => {
  const Settings = useSelector(
    (state: RootState) => state.generalSettings.modalContent
  );

  return (
    <Modal scrollBehavior={"inside"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={{ base: "95vw", sm: "500px" }}>
        <ModalHeader>Authorize</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody>
          {Settings === ModalEnum.FORGOT_PASSWORD ? (
            <ForgotPassword />
          ) : Settings === ModalEnum.RESET_PASSWORD ? (
            <ResetPassword email={email} token={token} />
          ) : (
            <AuthenticationTab onClose={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthenticationModal;
