const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch")
const URL = "https://612131fcf5849d0017fb41b0.mockapi.io/prac"

// const logger = require("./middleware/logger");
// module.exports = router;
//init middleware
// app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
    fetch(URL)
    .then(response => response.json())
    res.json(response); 
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port", PORT));


