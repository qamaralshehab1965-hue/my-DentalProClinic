import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./servicesManager.css";

function ServicesManager() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [image, setImage] = useState("");

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const [editId, setEditId] = useState("");

  const getServices = async () => {
    const res = await fetch("http://localhost:3000/api/services");
    const data = await res.json();

    setServices(data);
  };

  useEffect(() => {
    const getServices = async () => {
      const res = await fetch("http://localhost:3000/api/services");
      const data = await res.json();

      setServices(data);
    };
    getServices();
  }, []);

  const addService = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("service_name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("doctor_id", doctorId);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("http://localhost:3000/api/services", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setMessage("✔ Service Added");
      setMessageColor("green");
      getServices();
    } else {
      setMessage("Failed to add service ❌");
      setMessageColor("red");
    }
  };

  const deleteService = async (id) => {
    await fetch(`http://localhost:3000/api/services/${id}`, {
      method: "DELETE",
    });

    setMessage("✖ Service Deleted");
    setMessageColor("red");

    getServices();
  };

  const prepareEdit = (service) => {
    setEditId(service.id);

    setName(service.title);
    setDescription(service.description);
    setPrice(service.price);
    setDoctorId(service.doctor_id);
  };

  const updateService = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("service_name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("doctor_id", doctorId);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(`http://localhost:3000/api/services/${editId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setMessage("⚠ Service Updated");
      setMessageColor("orange");
      setEditId(null);
      getServices();
    } else {
      setMessage("❌ Failed to update service");
      setMessageColor("red");
    }
  };

  return (
    <div className="services-manager">
      <h2>Manage Services</h2>

      <table className="services-table">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Doctor ID</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Service Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>

            <td>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </td>

            <td>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </td>

            <td>
              <input
                type="number"
                placeholder="Doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              />
            </td>

            <td>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </td>

            <td>
              {editId ? (
                <button className="update-btn" onClick={updateService}>
                  Update
                </button>
              ) : (
                <button className="add-btn" onClick={addService}>
                  Add
                </button>
              )}
            </td>
          </tr>

          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.service_name}</td>
              <td>{service.description}</td>
              <td>{service.price}</td>
              <td>{service.doctor_id}</td>

              <td>
                {service.image && (
                  <img
                    src={`http://localhost:3000/uploads/${service.image}`}
                    width="60"
                  />
                )}
              </td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => prepareEdit(service)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteService(service.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {message && (
        <p className="message-box" style={{ color: messageColor }}>
          {message}
        </p>
      )}

      <button
        className="my-comments-btn"
        onClick={() => navigate("/doctorReviews")}
      >
        Patient Reviews
      </button>
    </div>
  );
}

export default ServicesManager;
