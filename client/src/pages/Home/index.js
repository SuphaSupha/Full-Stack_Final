import Navbar from "../../components/Navbar/Navbar";
import DefaultLayout from "../../layouts/DefaultLayout";
import CenterLayout from "../../layouts/CenterLayout";
import Heading from "../../components/Heading/index";
import Button from "../../components/Button/index";
import Card from "../../components/Card/index";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <DefaultLayout>
        <Heading>Forum</Heading>
        <Link to="/add">
          <Button type="contained">ADD PET</Button>
        </Link>
      </DefaultLayout>
      <CenterLayout>
        <Card
          title="Edvinas"
          subtitle="TEXT kaskaskaskssak TEXT kaskaskaskssak TEXT kaskaskaskssak TEXT kaskaskaskssak TEXT kaskaskaskssak TEXT kaskaskaskssak TEXT kaskaskaskssak TEXT kaskaskaskssak TEXT kaskaskaskssak TEXT kaskaskaskssak s"
          description="laslsal"
        >
          <Button>Reply</Button>
          <Button type="contained">Delete</Button>
        </Card>
        <Card></Card>
        <Card></Card>
      </CenterLayout>
    </>
  );
};
export default Home;
