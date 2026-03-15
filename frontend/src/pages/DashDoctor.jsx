import { useEffect, useState } from "react";
import ServicesManager from "./ServicesManager";
import PatientsSection from "./PatientsSection";
import "./DashDoctor.css";

function DashDoctor() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const [showAppointments, setShowAppointments] = useState(false);
  const [showPatients, setShowPatients] = useState(false);

  const token = localStorage.getItem("token");
  const doctorId = localStorage.getItem("doctorId");

  async function loadAppointments() {
    const res = await fetch(
      `http://localhost:3000/api/appointments/appo/doctor/${doctorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    setAppointments(data);
  }

  async function loadPatients() {
    const res = await fetch(
      `http://localhost:3000/api/patients/doctor/${doctorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    setPatients(data);
  }

  useEffect(() => {
    loadAppointments();
    loadPatients();
  }, [doctorId]);

  async function confirmAppointment(id) {
    await fetch(`http://localhost:3000/api/appointments/confirm/${id}`, {
      method: "PUT",
    });

    loadAppointments();
  }

  async function cancelAppointment(id) {
    await fetch(`http://localhost:3000/api/appointments/cancel/${id}`, {
      method: "PUT",
    });

    loadAppointments();
  }

  async function deleteAppointment(id) {
    await fetch(`http://localhost:3000/api/appointments/delete/${id}`, {
      method: "DELETE",
    });

    loadAppointments();
  }

  return (
    <div>
      <h2 className="dashboard-title">Doctor Dashboard</h2>

      <div className="center-button">
        <button
          className="main-btn"
          onClick={() => setShowAppointments(!showAppointments)}
        >
          Appointments
        </button>
      </div>

      {showAppointments && (
        <div className="table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Service</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="7">No appointments found</td>
                </tr>
              ) : (
                appointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.firstname}</td>

                    <td>{app.lastname}</td>

                    <td>{app.service_name}</td>

                    <td>{app.price}</td>

                    <td>
                      {app.appointment_datetime
                        ? new Date(app.appointment_datetime).toLocaleString()
                        : "No Date"}
                    </td>

                    <td>
                      <span className={`status ${app.status}`}>
                        {app.status}
                      </span>
                    </td>

                    <td>
                      <div className="actions">
                        <button
                          className="confirm-btn"
                          onClick={() => confirmAppointment(app.id)}
                        >
                          Confirm
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={() => cancelAppointment(app.id)}
                        >
                          Cancel
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteAppointment(app.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="center-button">
        <button
          className="main-btn"
          onClick={() => setShowPatients(!showPatients)}
        >
          Patients
        </button>
      </div>

      {showPatients && (
        <PatientsSection patients={patients} reloadPatients={loadPatients} />
      )}
      <ServicesManager />
    </div>
  );
}

export default DashDoctor;
