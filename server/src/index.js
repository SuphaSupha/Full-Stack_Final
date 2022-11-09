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
//get comments
app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM PVZ_table");
    res.send(response);

    await con.end();
  } catch (e) {
    console.log(e);
  }
});
//get one comment
app.get("/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`
    SELECT *
    FROM PVZ.PVZ_table
    WHERE id = ${req.params.id}
    `);
    await con.end();
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Server error" });
  }
});

//post comments
app.post("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const data = req.body;
    const [response] = await con.execute(
      `INSERT INTO PVZ_table ( name, description) values (${con.escape(
        data.name
      )}, ${con.escape(data.description)})`
    );
    res.send(response);
    await con.end();
  } catch (e) {
    console.error(e);
  }
});
//delete

app.delete("/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      `DELETE FROM PVZ_table WHERE id=${req.params.id}`
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
//Reg
app.post("/register", async (req, res) => {
  let userData = req.body;
  //schemos validacija
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    console.log({ error: "Incorect data " });
  }

  try {
    const hashedpass = bcrypt.hashSync(userData.password);
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      `INSERT INTO PVZ_users (email, password) VALUES (${mysql.escape(
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
// app.post("/register", async (req, res) => {
//   try {
//     const con = await mysql.createConnection(dbconfig);
//     const username = req.body.name;
//     const password = req.body.password;
//     const [response] = await con.execute(
//       `INSERT INTO PVZ.PVZ_users ( name, password) values(${con.escape(
//         username
//       )}, ${con.escape(password)})`
//     );
//     res.send(response);
//   } catch (e) {
//     console.error(e);
//   }
// });
//logIn
app.post("/login", async (req, res) => {
  let userData = req.body;
  //schemos validacija
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (e) {
    return res.status(400).send({ error: "Incorect dataaaaaa " });
  }
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`
    SELECT * FROM PVZ_users
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

      return res.send({ token });
    } else {
      return res.status(400).send({ error: "incorrect password" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: "Server error" });
  }
});

// app.post("/login", async (req, res) => {
//   try {
//     const con = await mysql.createConnection(dbconfig);
//     const username = req.body.name;
//     const password = req.body.password;
//     const [response] = await con.execute(
//       "SELECT * FROM PVZ.PVZ_users WHERE name = ? AND password = ?",
//       [username, password],
//       (err, result) => {
//         if (response.lenght > 0) {
//           res.send(response);
//         } else {
//           res.send({ message: "Wrong name/password combination!" });
//         }
//       }
//     );
//     console.log(response);
//     await con.end();
//   } catch (e) {
//     console.error(e);
//   }
// });

app.all("*", async (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
