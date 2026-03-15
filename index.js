import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import patientsRoutes from "./routes/patients.routes.js";
import doctorRoutes from "./routes/doctors.routes.js";
import appointmentRoutes from "./routes/appointments.routes.js";
import rewiewsRoutes from "./routes/reviews.routes.js";
import servicesRoutes from "./routes/services.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/reviews", rewiewsRoutes);
app.use("/api/appointments", appointmentRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
