import express from "express";
import { pool } from "../db.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/doctor/:doctorId", async (req, res) => {
  const { doctorId } = req.params;

  try {
    const result = await pool.query(
      `
SELECT
r.id,
r.rating,
r.comment,
r.created_at,

s.service_name,

u.firstname AS patient_firstname,
u.lastname AS patient_lastname

FROM reviews r

JOIN services s
ON r.service_id = s.id

JOIN users u
ON r.user_id = u.id

WHERE s.doctor_id = $1

ORDER BY r.created_at DESC
`,
      [doctorId],
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/add", protect, async (req, res) => {
  const { service_id, rating, comment } = req.body;

  const userId = req.user.id;

  const check = await pool.query(
    `
    SELECT *
    FROM appointments
    WHERE user_id = $1
    AND service_id = $2
    AND status = 'completed'
    `,
    [userId, service_id],
  );

  if (check.rows.length === 0) {
    return res.status(400).json({
      message:
        "You cannot add a review unless you have a completed appointment",
    });
  }

  const result = await pool.query(
    `
    INSERT INTO reviews (user_id, service_id, rating, comment)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [userId, service_id, rating, comment],
  );

  res.json(result.rows[0]);
});
router.get("/services", async (req, res) => {
  const result = await pool.query(`
SELECT id, service_name
FROM services
ORDER BY service_name
`);

  res.json(result.rows);
});

router.get("/", protect, async (req, res) => {
  const result = await pool.query(`
SELECT
r.id,
r.rating,
r.comment,
r.created_at,

s.service_name,

u.firstname AS patient_firstname,
u.lastname AS patient_lastname

FROM reviews r

JOIN services s
ON r.service_id = s.id

JOIN users u
ON r.user_id = u.id

ORDER BY r.created_at DESC
`);

  res.json(result.rows);
});
router.get("/public", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      r.id,
      r.rating,
      r.comment,
      r.created_at,
      s.service_name,
      d.firstname AS doctor_firstname,
      d.lastname AS doctor_lastname
      FROM reviews r
      JOIN services s ON r.service_id = s.id
      JOIN users d ON s.doctor_id = d.id
      ORDER BY r.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
