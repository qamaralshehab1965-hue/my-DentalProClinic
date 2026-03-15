import express from "express";
import { pool } from "../db.js";
import { protect } from "../middleware/auth.middleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Users route working" });
});

router.post("/register", async (req, res) => {
  const { email, password, firstname, lastname, phone, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users
      (email,password,firstname,lastname,phone,address,role,status)
      VALUES ($1,$2,$3,$4,$5,$6,'patient','active')
      RETURNING id,email,firstname,lastname,phone,address,role,status
      `,
      [email, hashedPassword, firstname, lastname, phone, address],
    );

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getUsers", protect, async (req, res) => {
  const result = await pool.query(
    `
    SELECT * FROM users`,
  );

  res.json(result.rows);
});

router.get("/getUser/:id", protect, async (req, res) => {
  const id = req.params.id;

  const result = await pool.query(
    `
    SELECT 
      id,
      email,
      firstname,
      lastname,
      phone,
      address,
      role,
      status,
      created_at,
      updated_at
    FROM users
    WHERE id=$1
    `,
    [id],
  );

  res.json(result.rows[0]);
});

router.put("/updateUserStatus/:id", protect, async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const result = await pool.query(
    `
    UPDATE users
    SET status=$1, updated_at=NOW()
    WHERE id=$2
    RETURNING id,email,status
    `,
    [status, id],
  );

  res.json(result.rows[0]);
});

router.delete("/deleteUser/:id", protect, async (req, res) => {
  const id = req.params.id;

  await pool.query(
    `
    DELETE FROM users
    WHERE id=$1
    `,
    [id],
  );

  res.json({ message: "User deleted" });
});

export default router;
