import express from "express";
import { pool } from "../db.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await pool.query(`
    SELECT 
      id,
      firstname,
      lastname,
      email,
      phone,
      address,
      status
    FROM users
    WHERE role='patient'
    ORDER BY id DESC
  `);

  res.json(result.rows);
});

router.get("/doctor/:doctorId", async (req, res) => {
  const result = await pool.query(`
    SELECT 
      id,
      firstname,
      lastname,
      email,
      phone,
      address,
      status
    FROM users
    WHERE role='patient'
    ORDER BY id DESC
  `);

  res.json(result.rows);
});

router.get("/:id", protect, async (req, res) => {
  const id = req.params.id;

  const result = await pool.query(
    `
    SELECT 
      id,
      firstname,
      lastname,
      email,
      phone,
      address,
      status,
      created_at,
      updated_at
    FROM users
    WHERE id=$1 AND role='patient'
    `,
    [id],
  );

  res.json(result.rows[0]);
});

router.post("/addPatient", async (req, res) => {
  const { firstname, lastname, email, phone, address, status } = req.body;

  const result = await pool.query(
    `
    INSERT INTO users
    (firstname,lastname,email,phone,address,status,role)
    VALUES ($1,$2,$3,$4,$5,$6,'patient')
    RETURNING id,first_name,last_name,email,phone,address,status
    `,
    [firstname, lastname, email, phone, address, status],
  );

  res.json(result.rows[0]);
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  const { firstname, lastname, email, phone, address, status } = req.body;

  const result = await pool.query(
    `
    UPDATE users
    SET 
      firstname=$1,
      lastname=$2,
      email=$3,
      phone=$4,
      address=$5,
      status=$6,
      updated_at=NOW()
    WHERE id=$7
    RETURNING id,firstname,lastname,email,phone,address,status
    `,
    [firstname, lastname, email, phone, address, status, id],
  );

  res.json(result.rows[0]);
});

router.delete("/deletePatient/:id", protect, async (req, res) => {
  const id = req.params.id;

  await pool.query(
    `
    DELETE FROM users
    WHERE id=$1 AND role='patient'
    `,
    [id],
  );

  res.json({ message: "Patient deleted" });
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;

  const { firstname, lastname, email, phone, address, status } = req.body;

  try {
    await pool.query(
      `
UPDATE users
SET
firstname=$1,
lastname=$2,
email=$3,
phone=$4,
address=$5,
status=$6
WHERE id=$7
`,
      [firstname, lastname, email, phone, address, status, id],
    );

    res.json({ message: "Patient updated" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server error" });
  }
});

export default router;
