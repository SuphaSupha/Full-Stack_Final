import styled from "styled-components";

const OrangeButton = styled.button`
  background-color: #eb5d05;
  border: 2px solid #eb5d05;
  padding: 0px 32px;
  border-radius: 6px;
  margin: 6px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;
const WhiteButton = styled.button`
  background-color: white;
  border: 2px solid #eb5d05;
  padding: 0px 32px;
  border-radius: 6px;

  margin: 6px;
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
      <OrangeButton>
        <WhiteText>{children}</WhiteText>
      </OrangeButton>
    );
  } else {
    return (
      <WhiteButton>
        <BlackText>{children}</BlackText>
      </WhiteButton>
    );
  }
};

export default Button;
