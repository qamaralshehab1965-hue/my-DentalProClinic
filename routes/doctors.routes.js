import express from "express";
import { pool } from "../db.js";
import { protect } from "../middleware/auth.middleware.js";
import allowed from "../middleware/role.middleware.js";
const router = express.Router();

router.get(
  "/getDoctors",
  protect,
  allowed("doctor,patient"),
  async (req, res) => {
    const result = await pool.query(`
    SELECT 
      d.id,
      d.firstname,
      d.lastname,
      d.specialty,
      d.phone,
      u.email
    FROM doctors d
    JOIN users u ON d.user_id = u.id
  `);

    res.json(result.rows);
  },
);
router.get("/doctor/:doctorId", protect, async (req, res) => {
  const { doctorId } = req.params;

  const result = await pool.query(
    "SELECT id, name FROM services WHERE doctor_id = $1",
    [doctorId],
  );

  res.json(result.rows);
});

router.get("/services/doctor/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  const result = await pool.query(
    `
    SELECT id, service_name
    FROM services
    WHERE doctor_id = $1
    `,
    [doctorId],
  );

  res.json(result.rows);
});

router.get("/count", async (req, res) => {
  const result = await pool.query("SELECT COUNT(*) FROM doctors");
  res.json(result.rows[0].count);
});

router.post("/addDoctor", async (req, res) => {
  const { email, password, firstname, lastname, specialty, phone } = req.body;

  const userResult = await pool.query(
    "INSERT INTO users (email, password,firstname, lastname, status) VALUES ($1,$2,$3,$4,'active') RETURNING id",
    [email, password, firstname, lastname, "doctor"],
  );
  const userId = userResult.rows[0].id;
  await pool.query(
    "INSERT INTO doctors (user_id, firstname, lastname, specialty, phone, role) VALUES ($1,$2,$3,$4,$5,'doctor')",
    [userId, firstname, lastname, specialty, phone],
  );
  res.json("Doctor created successfully");
});

router.delete(
  "/deleteDoctor/:id",
  protect,
  allowed("doctor"),
  async (req, res) => {
    const id = req.params.id;
    const doctor = await pool.query(
      "DELETE FROM doctors WHERE id=$1 RETURNING user_id",
      [id],
    );
    const userId = doctor.rows[0].user_id;
    await pool.query("DELETE FROM users WHERE id=$1", [userId]);
    res.json("Doctor deleted");
  },
);

export default router;
