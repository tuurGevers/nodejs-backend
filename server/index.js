const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser")
const cors = require("cors")

/*
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Root",
    database: "reactcrudd"

})
*/


const db = mysql.createPool({
    host: "sql11.freemysqlhosting.net",
    user: "sql11480374",
    password: "4bpI654WEs",
    database: "sql11480374"

})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render("hello")
});

app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, moviereview) Values (?,?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result)
    })
});

app.post("/api/alter", (req, res) => {

    const movieReview = req.body.review;
    const movieId = req.body.id;

    const sqlAlter = "UPDATE movie_reviews SET movieReview = ? WHERE id=?"
    db.query(sqlAlter, [movieReview, movieId], (err, result) => {
        console.log(result )
    })
});

app.post("/api/delete/:id", (req, res) => {

    const id = req.params.id


    const sqlDelete = "DELETE FROM movie_reviews WHERE id=?";
    db.query(sqlDelete, id, (err, result) => {
        console.log(result)
    })
});

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })

});

app.listen(3001, () => {
    console.log("running on port 3001")
})