const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../config/db");


// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      role,
      password,
    } = req.body;


    // Check required fields

    if (!full_name || !email || !phone || !role || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }


    // Check whether email already exists

    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, results) => {

      if (err) {
        console.error("Database error:", err);

        return res.status(500).json({
          success: false,
          message: "Database error.",
        });
      }


      if (results.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered.",
        });
      }


      // Hash password

      const hashedPassword = await bcrypt.hash(password, 10);


      // Insert user

      const sql = `
        INSERT INTO users
        (full_name, email, phone, role, password)
        VALUES (?, ?, ?, ?, ?)
      `;

      const values = [
        full_name,
        email,
        phone,
        role,
        hashedPassword,
      ];


      db.query(sql, values, (err, result) => {

        if (err) {
          console.error("Registration error:", err);

          return res.status(500).json({
            success: false,
            message: "Failed to register user.",
          });
        }


        res.status(201).json({
          success: true,
          message: "Registration successful!",
          userId: result.insertId,
        });

      });

    });

  } catch (error) {

    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });

  }
};



// ==========================================
// LOGIN USER
// ==========================================

const loginUser = (req, res) => {

  const { email, password } = req.body;


  // Check required fields

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }


  // Find user

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {

    if (err) {

      console.error("Database error:", err);

      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }


    // User doesn't exist

    if (results.length === 0) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

    }


    const user = results[0];


    // Compare password

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!passwordMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

    }


    // Create JWT

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );


    // Send response

    res.json({
      success: true,
      message: "Login successful!",
      token,

      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  });

};



// ==========================================
// EXPORT
// ==========================================

module.exports = {
  registerUser,
  loginUser,
};