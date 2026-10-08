const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/checkout", (req, res) => {
    const { fullName, postalCode } = req.body;
    if (!fullName || fullName.length < 5) {
        return res.status(400).json({
            message:"Full Name must contain at least 5 characters."
        });
    }
    if (fullName.length > 20) {
        return res.status(400).json({
            message:"Full Name must contain no more than 20 characters."
        });
    }

    if (!/^\d{6}$/.test(postalCode)) {
        return res.status(400).json({
            message:"Postal Code must contain exactly 6 digits."
        });
    }

    // Everything is valid
    res.json({
        message:"Order placed successfully."
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
