const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { connect } = require("http2");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

const SECRET_KEY = "your_secret_key";
const REFRESH_SECRET_KEY = "your_refresh_secret_key";

const AccessToken = jwt.sign({ userId: "12345" }, SECRET_KEY, {
  expiresIn: "15m",
});
const RefreshToken = jwt.sign({ userId: "12345" }, REFRESH_SECRET_KEY, {
  expiresIn: "1d",
});

app.post("/login", (req, res) => {
  res.json({
    accessToken: AccessToken,
    refreshToken: RefreshToken,
    user: { id: "12345", name: "Mohammad Nikkhah", age: 21 },
  });
});

app.get("/validate-access-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access token is required");
  try {
    jwt.verify(token, SECRET_KEY);
    res.status(200).send("Access token is valid");
  } catch {
    res.status(401).send("Invalid access token");
  }
});

app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send("Refresh token is required");

  try {
    jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    const newAccessToken = jwt.sign({ userId: "12345" }, SECRET_KEY, {
      expiresIn: "15m",
    });
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(401).send("Invalid refresh token");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
