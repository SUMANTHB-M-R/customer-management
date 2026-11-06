const jwt = require("jsonwebtoken");

function login(email, password) {
  const users = [
    {
      email: process.env.USER1_EMAIL,
      password: process.env.USER1_PASSWORD,
    },
    {
      email: process.env.USER2_EMAIL,
      password: process.env.USER2_PASSWORD,
    },
  ];

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  return token;
}

module.exports = { login };