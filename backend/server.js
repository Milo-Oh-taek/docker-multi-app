const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

// json 형대토 오는 요청의 본문을 해석해줄수있게 등록
app.use(bodyParser.json());

// 테이블 생성하기
db.pool.query(
  `CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT, 
  PRIMARY KEY (id)
)`,
  (err, results, fileds) => {
    console.log("results", results);
  }
);

app.listen(5000, () => {
  console.log("server started on 5000");
});

app.get("/api/values", function (req, res) {
  db.pool.query("SELECT * FROM lists;", (err, results, fileds) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

app.post("/api/value", function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fileds) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});
