require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5001;
// PORT 80 is default for localhost, in routes for request, 80 does not
// need to be specified

const exRouter = require("../middleware");

const app = express();
app.use(express.json());

app.use(exRouter);

app.get("/health", (req, res) => 
    res.status(200).json({message: "API is working"
}));

app.listen(port, () => {
    // syncTables();
    console.log(`Server is listening on port ${port}`)
});