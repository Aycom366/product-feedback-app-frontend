import styled from "styled-components";

interface ButtonProps {
  hover_background?: string;
  hover_color?: string;
  h?: string;
  w?: string;
  display?: Boolean;
  p?: string;
  bg?: string;
  border?: Boolean;
  fontWeight?: string;
  fontSize?: string;
  br?: string;
}

export const Button = styled.button<ButtonProps>`
  background: ${(props) => props.bg || "transparent"};
  outline: "none";
  border: none;
  border-bottom: ${(props) => (props.border ? "1px solid #4661E6" : "none")};
  height: ${(props) => props.h || "auto"};
  width: ${(props) => props.w || "auto"};
  display: ${(props) => props.display && "none"};
  display: "flex";
  font-weight: ${(props) => props.fontWeight || "normal"};
  align-items: center;
  font-size: ${(props) => props.fontSize || "1rem"};
  justify-content: center;
  padding: ${(props) => props.p || "5px"};
  border-radius: ${(props) => props.br || "none"};
  color: ${(props) => props.color || "transparent"};

  &:hover {
    background: ${(props) => props.hover_background || "transparent"};
    color: ${(props) => props.hover_color || ""};
  }

  @media screen and (max-width: 600px) {
    display: ${(props) => props.display && "flex"};
  }
`;
