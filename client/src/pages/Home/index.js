import Navbar from "../../components/Navbar/Navbar";
import DefaultLayout from "../../layouts/DefaultLayout";
import CenterLayout from "../../layouts/CenterLayout";
// import Heading from "../../components/Heading/index";
import Button from "../../components/Button/index";
import Card from "../../components/Card/index";
// import { useState, useEffect } from "react";
import CustomForm from "../../components/CustomForm/index";
import { useContext } from "react";
import { CommentContext } from "../../context/CommentProvider";
import { NightDayContext } from "../../context/NightDayProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { comments } = useContext(CommentContext);
  const { isNight } = useContext(NightDayContext);

  const deleteFunction = (id) => {
    fetch("http://localhost:8080/" + id, {
      method: "DELETE",
    });
  };

  return (
    <>
      <Navbar title="Sing up" subtitle="Log in"></Navbar>
      <DefaultLayout style={{ background: isNight ? "black" : "#ffffff" }}>
        <CustomForm />
      </DefaultLayout>
      <CenterLayout style={{ background: isNight ? "black" : "#ffffff" }}>
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Card
                title={comment.name}
                subtitle={comment.description}
                num={comment.num}
              >
                <Link to={`/comment/${comment.id}`}>
                  <Button type="contained">View log</Button>
                </Link>
                <Button
                  type="contained"
                  onClick={() => deleteFunction(comment.id)}
                >
                  Delete
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </CenterLayout>
    </>
  );
};
export default Home;
