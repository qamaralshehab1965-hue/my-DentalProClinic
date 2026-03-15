import express from "express";
import multer from "multer";
import { pool } from "../db.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM services");
  res.json(result.rows);
});

router.post("/", upload.single("image"), async (req, res) => {
  const { service_name, description, price, doctor_id } = req.body;
  const image = req.file ? req.file.filename : null;

  await pool.query(
    "INSERT INTO services (service_name,description,price,doctor_id,image) VALUES ($1,$2,$3,$4,$5)",
    [service_name, description, price, doctor_id, image],
  );

  res.json("service added");
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const { service_name, description, price, doctor_id } = req.body;
  const { id } = req.params;

  let image = null;

  if (req.file) {
    image = req.file.filename;
  }

  try {
    if (image) {
      await pool.query(
        "UPDATE services SET service_name=$1, description=$2, price=$3, doctor_id=$4, image=$5 WHERE id=$6",
        [service_name, description, price, doctor_id, image, id],
      );
    } else {
      await pool.query(
        "UPDATE services SET service_name=$1, description=$2, price=$3, doctor_id=$4 WHERE id=$5",
        [service_name, description, price, doctor_id, id],
      );
    }

    res.json({ message: "service updated" });
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ error: "update failed" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM services WHERE id=$1", [id]);

  res.json("service deleted");
});

export default router;
