const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    console.log("Login:", username);

    res.json({
        success: true,
        message: "Login request received"
    });
});

app.post("/register", (req, res) => {
    const { username, password } = req.body;

    console.log("Register:", username);

    res.json({
        success: true,
        message: "Registration request received"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});