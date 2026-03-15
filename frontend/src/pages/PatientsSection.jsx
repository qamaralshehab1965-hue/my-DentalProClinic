import { useState } from "react";

function PatientsSection({ patients, reloadPatients }) {
  const [editingPatient, setEditingPatient] = useState(null);

  const token = localStorage.getItem("token");

  async function savePatient() {
    await fetch(
      `http://localhost:3000/api/patients/edit/${editingPatient.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          firstname: editingPatient.firstname,
          lastname: editingPatient.lastname,
          email: editingPatient.email,
          phone: editingPatient.phone,
          address: editingPatient.address,
          status: editingPatient.status,
        }),
      },
    );

    setEditingPatient(null);

    reloadPatients();
  }

  return (
    <div className="table-container">
      <table className="appointments-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.firstname}</td>

              <td>{p.lastname}</td>

              <td>{p.email}</td>

              <td>{p.phone}</td>

              <td>{p.address}</td>

              <td>{p.status}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => setEditingPatient(p)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPatient && (
        <div className="edit-box">
          <h3>Edit Patient</h3>

          <input
            placeholder="First Name"
            value={editingPatient.firstname || ""}
            onChange={(e) =>
              setEditingPatient({
                ...editingPatient,
                firstname: e.target.value,
              })
            }
          />

          <input
            placeholder="Last Name"
            value={editingPatient.lastname || ""}
            onChange={(e) =>
              setEditingPatient({
                ...editingPatient,
                lastname: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            value={editingPatient.email || ""}
            onChange={(e) =>
              setEditingPatient({
                ...editingPatient,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone"
            value={editingPatient.phone || ""}
            onChange={(e) =>
              setEditingPatient({
                ...editingPatient,
                phone: e.target.value,
              })
            }
          />

          <input
            placeholder="Address"
            value={editingPatient.address || ""}
            onChange={(e) =>
              setEditingPatient({
                ...editingPatient,
                address: e.target.value,
              })
            }
          />

          <select
            value={editingPatient.status || ""}
            onChange={(e) =>
              setEditingPatient({
                ...editingPatient,
                status: e.target.value,
              })
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="edit-actions">
            <button className="save-btn" onClick={savePatient}>
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => setEditingPatient(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientsSection;
