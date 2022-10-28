import styled from "styled-components";
import Breathe from "../../components/Breathe/Breathe";

// import facts from "randomfacts";

const Container = styled.div`
  height: 744px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Error = () => {
  return (
    <Container>
      <Breathe
        bgColor="#f9f9f9"
        textOne="404"
        textTwo="Page"
        textThree="Not"
        textFour="Found"
        textFive="....."
      ></Breathe>
    </Container>
  );
};

export default Error;
