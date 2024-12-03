const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root", //mysql의 id
    password: "1234", //mysql의 password
    database: "react_project", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("프로젝트 코딩 중!");
});

app.post("/signin", (req, res) => {
    const inputID = req.body.inputID;
    const inputPW = req.body.inputPW;
    console.log("##req", req);
    // console.log("##res", res);

    connection.query(
        "INSERT INTO `react_project`.`user_` (`id`,`pw`,`insertdate`) values (?,?,NOW())",
        [inputID, inputPW],
        function (err, rows) {
            console.log("##rows", rows);
            if (err) {
                console.log("실패", err);
                // res.status(500).json({ success: false, error: err });
                // res.status(500).json(err);
                // return { success: false, error: err };
                return res.status(500).json({
                    success: false,
                    message: "서버 오류가 발생했습니다.",
                    error: err, // 상세 오류 정보
                });
            } else {
                console.log("성공");
                // res.status(200).json("가입 성공");
                // res.status(200).json({ success: true });
                // return { success: true };
                return res.status(200).json({
                    success: true,
                    message: "회원가입이 완료되었습니다.",
                });
            }
        }
    );

    // if (!inputID || !inputPW) {
    //     return res.status(400).json({ success: false, message: "ID와 PW를 모두 입력해주세요." });
    // }

    // users.push({ inputID, inputPW });
    // res.json({ success: true, message: "회원가입이 완료되었습니다." });
});

app.post("/idcheck", (req, res) => {
    const { inputID } = req.body;
    console.log("##", inputID);
    connection.query(
        "SELECT COUNT(id) AS count FROM `react_project`.`user_` WHERE id=?",
        [inputID],
        function (err, rows) {
            console.log("##rows", rows);
            if (err) {
                console.log("실패", err);
                return res.status(500).json({
                    success: false,
                    message: "서버 오류가 발생했습니다.",
                    error: err, // 상세 오류 정보
                });
            } else {
                // 아이디 중복 여부 확인
                if (rows[0].count > 0) {
                    // 아이디가 이미 존재하면
                    console.log("## 존재하는 아이디");
                    return res.status(200).json({
                        success: false,
                        message: "이미 사용 중인 아이디입니다.",
                    });
                } else {
                    // 아이디가 사용 가능하면
                    console.log("## 사용가능한 아이디");
                    return res.status(200).json({
                        success: true,
                        message: "사용 가능한 아이디입니다.",
                    });
                }
            }
        }
    );
    // const isDuplicate = users.some((user) => user.inputID === inputID);

    // if (isDuplicate) {
    //     return res.json({ success: false, message: "이미 사용 중인 아이디입니다." });
    // }
    // res.json({ success: true, message: "사용 가능한 아이디입니다." });
});

app.post("/login", (req, res) => {
    const inputID = req.body.inputID;
    const inputPW = req.body.inputPW;

    connection.query(
        "SELECT id,pw FROM `react_project`.`user_` WHERE id=? and pw=?",
        [inputID, inputPW],
        function (err, rows) {
            if (err) {
                console.log("실패", err);
                return res.status(500).json({
                    success: false,
                    message: "서버 오류가 발생했습니다.",
                    error: err, // 상세 오류 정보
                });
            } else {
                if (rows.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: "로그인 실패",
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "로그인 성공",
                    });
                }
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
});
