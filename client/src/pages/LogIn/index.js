import Navbar from "../../components/Navbar/Navbar";
import DefaultLayout from "../../layouts/DefaultLayout";
import CenterLayout from "../../layouts/CenterLayout";
import Heading from "../../components/Heading";
import LogInForm from "../../components/LoginForm";
import { useContext } from "react";
import { NightDayContext } from "../../context/NightDayProvider";

const LogIn = () => {
  const { isNight } = useContext(NightDayContext);
  return (
    <>
      <Navbar />
      <DefaultLayout
        style={{
          background: isNight ? "black" : "white",
        }}
      >
        <Heading>Log In</Heading>
      </DefaultLayout>
      <CenterLayout
        style={{
          background: isNight ? "black" : "white",
        }}
      >
        <LogInForm>Log in</LogInForm>
      </CenterLayout>
    </>
  );
};

export default LogIn;
