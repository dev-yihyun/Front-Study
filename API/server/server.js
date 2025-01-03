const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    database: "react_project",
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
    const inputName = req.body.inputName;
    const inputPhone = req.body.inputPhone;
    const inputEmail = req.body.inputEmail;

    connection.query(
        "INSERT INTO `react_project`.`user_` (`id`,`pw`,`name`,`phone`,`email`,`insertdate`) values (?,?,?,?,?,NOW())",
        [inputID, inputPW, inputName, inputPhone, inputEmail],
        function (err) {
            if (err) {
                console.log("실패", err);

                return res.status(500).json({
                    success: false,
                    message: "서버 오류가 발생했습니다.",
                    error: err,
                });
            } else {
                console.log("회원가입 성공");
                return res.status(200).json({
                    success: true,
                    message: "회원가입이 완료되었습니다.",
                });
            }
        }
    );
});

app.post("/idcheck", (req, res) => {
    const { inputID } = req.body;
    connection.query(
        "SELECT COUNT(id) AS count FROM `react_project`.`user_` WHERE id=?",
        [inputID],
        function (err, rows) {
            if (err) {
                console.log("실패", err);
                return res.status(500).json({
                    success: false,
                    message: "서버 오류가 발생했습니다.",
                    error: err,
                });
            } else {
                if (rows[0].count > 0) {
                    return res.status(200).json({
                        success: false,
                        message: "사용할 수 없는 아이디입니다.",
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "사용 가능한 아이디입니다.",
                    });
                }
            }
        }
    );
});

const JWT_SECRET = "your_jwt_secret_key";
const jwt = require("jsonwebtoken");
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
                    error: err,
                });
            } else {
                if (rows.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: "로그인 실패",
                    });
                } else {
                    const token = jwt.sign({ id: inputID }, JWT_SECRET, { expiresIn: "1h" });
                    console.log("토큰 생성:", token);
                    return res.status(200).json({
                        success: true,
                        message: "로그인 성공",
                        token: token,
                    });
                }
            }
        }
    );
});

app.post("/findid", (req, res) => {
    const dataName = req.body.name;
    const dataContact = req.body.contact;
    const dataType = req.body.type;
    const query =
        dataType === "email"
            ? "SELECT id FROM `react_project`.`user_` WHERE name=? and email=?"
            : "SELECT id FROM `react_project`.`user_` WHERE name=? and phone=?";

    connection.query(query, [dataName, dataContact], function (err, result) {
        if (err) {
            console.log("ID 찾기 실패", err);
            return res.status(500).json({
                success: false,
                message: "서버 오류가 발생했습니다.",
                error: err,
            });
        } else {
            if (result.length > 0) {
                console.log("ID 찾기 성공");
                return res.status(200).json({
                    success: true,
                    message: result,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: "아이디를 찾을 수 없습니다.",
                });
            }
        }
    });
});

app.post("/findpw", (req, res) => {
    const inputID = req.body.inputID;
    const inputName = req.body.inputName;
    const inputPhone = req.body.inputPhone;
    const inputEmail = req.body.inputEmail;
    const query =
        "SELECT pw FROM `react_project`.`user_` where id=? and name=? and email=? and phone=? ";

    connection.query(query, [inputID, inputName, inputEmail, inputPhone], function (err, result) {
        if (err) {
            console.log("PW 찾기 실패", err);
            return res.status(500).json({
                success: false,
                message: "서버 오류가 발생했습니다.",
                error: err,
            });
        } else {
            if (result.length > 0) {
                console.log("PW 찾기 성공");
                return res.status(200).json({
                    success: true,
                });
            } else {
                return res.status(200).json({
                    success: false,
                });
            }
        }
    });
});
app.post("/resetpassword", (req, res) => {
    const inputID = req.body.inputID;
    const password = req.body.password;

    const query = "UPDATE `react_project`.`user_` SET pw=? WHERE id=? ;";
    connection.query(query, [password, inputID], function (err, result) {
        if (err) {
            console.log("PW update fail", err);
            return res.status(500).json({
                success: false,
                message: "서버 오류가 발생했습니다.",
                error: err,
            });
        } else {
            try {
                console.log("PW update success");
                return res.status(200).json({
                    success: true,
                });
            } catch (error) {
                console.log("PW update err : ", err);
                return res.status(200).json({
                    success: false,
                });
            }
        }
    });
});

app.post("/mypage", (req, res) => {
    const userID = req.body.userID;
    const query = "SELECT id,name,phone,email,insertdate FROM react_project.user_ WHERE id=?;";

    console.log("##userID", userID);

    connection.query(query, [userID], function (err, result) {
        if (err) {
            console.log("ID 찾기 실패", err);
            return res.status(500).json({
                success: false,
                message: "서버 오류가 발생했습니다.",
                error: err,
            });
        } else {
            if (result.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: result[0],
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: "정보를 찾을 수 없습니다.",
                });
            }
        }
    });
});

app.post("/emailupdate", (req, res) => {
    const userID = req.body.userID;
    const inputEmail = req.body.inputEmail;
    const query = "UPDATE `react_project`.`user_` SET email=? WHERE id=?;";

    connection.query(query, [inputEmail, userID], function (err) {
        if (err) {
            console.log("email update fail", err);
            return res.status(500).json({
                success: false,
                message: "서버 오류가 발생했습니다.",
                error: err,
            });
        } else {
            try {
                return res.status(200).json({
                    success: true,
                });
            } catch (error) {
                return res.status(200).json({
                    success: false,
                });
            }
        }
    });
});

app.post("/phoneupdate", (req, res) => {
    const userID = req.body.userID;
    const inputPhone = req.body.inputPhone;
    const query = "UPDATE `react_project`.`user_` SET phone=? WHERE id=?;";

    connection.query(query, [inputPhone, userID], function (err) {
        if (err) {
            console.log("phone update fail", err);
            return res.status(500).json({
                success: false,
                message: "서버 오류가 발생했습니다.",
                error: err,
            });
        } else {
            try {
                return res.status(200).json({
                    success: true,
                });
            } catch (error) {
                return res.status(200).json({
                    success: false,
                });
            }
        }
    });
});

app.post("/deleteuser", (req, res) => {
    const userID = req.body.userID;
    const query = "DELETE FROM `react_project`.`user_` WHERE id=?;";
    connection.query(query, [userID], function (err) {
        if (err) {
            console.log("##delete user fail", err);
            return res.status(500).json({
                success: false,
                message: "서버 오류가 발생했습니다.",
                error: err,
            });
        } else {
            try {
                return res.status(200).json({
                    success: true,
                });
            } catch (error) {
                return res.status(200).json({
                    success: false,
                });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
});
