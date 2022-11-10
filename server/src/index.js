const express = require("express");
const cors = require("cors");

const mysql = require("mysql2/promise");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { PORT, dbconfig, jwtSecret } = require("./config");

app.use(express.json());
app.use(cors());

const { isLoggedIn } = require("./mid");

//get questions
app.get("/questions", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM PVZ.questions");
    res.send(response);

    await con.end();
  } catch (e) {
    console.log(e);
  }
});

//get one question
app.get("/questions/:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`
    SELECT *
    FROM PVZ.questions
    WHERE id = ${req.params.id}
    `);
    await con.end();
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Server error" });
  }
});

//post question
app.post("/questions", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const data = req.body;
    const [response] = await con.execute(
      `INSERT INTO PVZ.questions (topic, question) values (${con.escape(
        data.topic
      )}, ${con.escape(data.question)})`
    );
    res.send(response);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

//put question
//neveikia
app.patch("/questions/edit:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const data = req.body;
    const [response] = await con.execute(
      `UPDATE PVZ.questions SET topic = ${data.topic} AND question =${data.question} WHERE id = ${req.params.id}`
    );
    res.send(response);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

//delete one question
app.delete("/questions/:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      `DELETE FROM PVZ.questions WHERE id=${req.params.id}`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

//registration
const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

app.post("/register", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    console.log({ error: "Incorect data " });
  }

  try {
    const hashedpass = bcrypt.hashSync(userData.password);
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      `INSERT INTO PVZ.users (email, password) VALUES (${mysql.escape(
        userData.email
      )}, '${hashedpass}')`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: "Server error" });
  }
});

//logIn
app.post("/login", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    console.log({ error: "Incorect data " });
  }
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`
    SELECT * FROM PVZ.users
    WHERE email = ${mysql.escape(userData.email)}`);
    await con.end();

    if (response.length === 0) {
      return res.status(400).send({ error: "incorrect email or password" });
    }
    const isAuthed = bcrypt.compareSync(
      userData.password,
      response[0].password
    );

    if (isAuthed) {
      const token = jwt.sign(
        { id: response[0].id, email: response[0].email },
        jwtSecret
      );
      console.log({ token });
      return res.send({ token });
    } else {
      return res.status(400).send({ error: "incorrect password" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: "Server error" });
  }
});

app.get("/answers", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM PVZ.answers");
    res.send(response);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

// get answers
//neveikia kaip noreciau, nenestina, visi answers pateikiami i visus questions.
// app.get("/answers", async (req, res) => {
//   try {
//     const con = await mysql.createConnection(dbconfig);
//     const [response] = await con.execute(
//       "SELECT answer FROM PVZ.answers JOIN PVZ.questions ON answers.id = questions.id"
//     );
//     res.send(response);
//     await con.end();
//   } catch (e) {
//     console.log(e);
//   }
// });

//post answer
app.post("/answers", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const data = req.body;
    const [response] = await con.execute(
      `INSERT INTO PVZ.answers (answer) values (${con.escape(data.answer)})`
    );
    res.send(response);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});

//delete answer
app.delete("/answers/:id", isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      `DELETE FROM PVZ.answers WHERE id=${req.params.id}`
    );
    res.send(response);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.all("*", async (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
