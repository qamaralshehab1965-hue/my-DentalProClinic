import express from "express";
import { pool } from "../db.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my/:doctorId", protect, async (req, res) => {
  const doctorId = req.params.doctorId;
  const userId = req.user.id;

  const result = await pool.query(
    `
    SELECT *
    FROM appointments
    WHERE doctor_id = $1
    AND user_id = $2
    ORDER BY appointment_datetime DESC
    LIMIT 1
    `,
    [doctorId, userId],
  );

  res.json(result.rows[0] || null);
});

router.post("/addFromUser", protect, async (req, res) => {
  const { doctor_id, appointment_datetime, service_id } = req.body;
  const userId = req.user.id;

  const check = await pool.query(
    `
    SELECT * 
    FROM appointments
    WHERE doctor_id = $1
    AND appointment_datetime = $2
    AND status != 'cancelled'
    `,
    [doctor_id, appointment_datetime],
  );

  if (check.rows.length > 0) {
    return res.status(400).json({
      message: "This time is already booked",
    });
  }

  const result = await pool.query(
    `
    INSERT INTO appointments
    (doctor_id, user_id, service_id, appointment_datetime, status)
    VALUES ($1,$2,$3,$4,'booked')
    RETURNING *
    `,
    [doctor_id, userId, service_id, appointment_datetime],
  );

  res.json(result.rows[0]);
});

router.get("/appo/doctor/:doctorId", protect, async (req, res) => {
  const { doctorId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        a.id,
        a.status,
        a.appointment_datetime,

        u.firstname,
        u.lastname,

        s.service_name,
        s.price

      FROM appointments a
      JOIN users u
      ON a.user_id = u.id

      JOIN services s
      ON a.service_id = s.id

      WHERE a.doctor_id = $1
      ORDER BY a.id DESC
    `,
      [doctorId],
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/confirm/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    `
    UPDATE appointments
    SET status = 'completed'
    WHERE id = $1
  `,
    [id],
  );

  res.json({ message: "Appointment completed" });
});

router.put("/cancel/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    `
    UPDATE appointments
    SET status = 'cancelled'
    WHERE id = $1
  `,
    [id],
  );

  res.json({ message: "Appointment cancelled" });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    `
    DELETE FROM appointments
    WHERE id = $1
  `,
    [id],
  );

  res.json({ message: "Appointment deleted" });
});

export default router;
