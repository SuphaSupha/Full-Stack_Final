import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { NightDayContext } from "../../context/NightDayProvider";
import { FaSun, FaMoon } from "react-icons/fa";

const Container = styled.div`
  height: 120px;
  padding: 20px 80px;
  border-bottom: 2px solid #536878;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(
    to bottom right,
    rgb(238, 0, 255),
    red,
    rgb(200, 255, 0)
  );
  background-color: orangered;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

const Logo = styled.div`
  color: grey;
  font-size: 40px;
  font-weight: 800px;
  &:hover {
    color: black;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0px 18px;
  font-size: 24px;
  color: grey;

  &:hover {
    color: black;
  }
`;
const RightContainer = styled.div`
  display: flex;
  text-decoration: none;
`;

const Mode = styled.div`
  position: absolute;
  right: 100px;
  top: 20px;
  color: grey;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

const Navbar = () => {
  const { isNight, toggleMode } = useContext(NightDayContext);
  return (
    <div>
      <Container
        style={{
          borderBottomLeftRadius: isNight ? 0 : 40,
          borderBottomRightRadius: isNight ? 0 : 40,
        }}
      >
        {" "}
        <Mode onClick={toggleMode}>{isNight ? <FaSun /> : <FaMoon />} </Mode>
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>DadJokes</Logo>
          </Link>
        </div>
        <RightContainer>
          <nav>
            <StyledLink to="/singup">Sing up</StyledLink>
            <StyledLink to="/login">Log in</StyledLink>
          </nav>
        </RightContainer>
      </Container>
    </div>
  );
};

export default Navbar;
