import styled from "styled-components";

const OrangeButton = styled.button`
  background-image: linear-gradient(
    to bottom right,
    rgb(238, 0, 255),
    red,
    rgb(200, 255, 0)
  );
  background-color: orangered;
  border: 2px solid #eb5d05;
  padding: 0px 32px;
  border-radius: 6px;
  margin: 6px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  &:hover {
    opacity: 0.8;
  }
`;
const WhiteButton = styled.button`
  background-color: white;
  border: 2px solid #eb5d05;
  padding: 0px 32px;
  border-radius: 6px;

  margin: 6px;
  &:hover {
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }
`;

const BlackText = styled.p`
  color: #eb5d05;
  font-size: 14px;
`;
const WhiteText = styled.p`
  color: white;
  font-size: 14px;
`;

const Button = ({ children, type, onClick }) => {
  if (type === "contained") {
    return (
      <OrangeButton onClick={onClick}>
        <WhiteText>{children}</WhiteText>
      </OrangeButton>
    );
  } else {
    return (
      <WhiteButton onClick={onClick}>
        <BlackText>{children}</BlackText>
      </WhiteButton>
    );
  }
};

export default Button;
