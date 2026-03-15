import express from "express";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;


    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    const user = result.rows[0];


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }


    let doctor = null;

    if (user.role === "doctor") {
      const doctorResult = await pool.query(
        "SELECT id, firstname, lastname FROM doctors WHERE user_id = $1",
        [user.id],
      );

      if (doctorResult.rows.length > 0) {
        doctor = doctorResult.rows[0];
      }
    }


    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );


    res.json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user.id,
        role: user.role,
        email: user.email,
      },

      doctor: doctor,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
