import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import Contact from "./pages/Contact";
import About from "./pages/About";
import DashDoctor from "./pages/DashDoctor";
import PatientReview from "./pages/PatientReview";
import Doctor from "./pages/Doctor";
import ProtectedRoute from "./pages/ProtectedRoute";
import Services from "./pages/Services";
import PatientsSection from "./pages/PatientsSection";
import ServicesManager from "./pages/ServicesManager";
import DoctorReviews from "./pages/DoctorReviews";
import PatientReviewPage from "./pages/PatientReviewPage";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <div className="contact">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reviews" element={<PatientReview />} />
            <Route path="/Doctor" element={<PatientReviewPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctors" element={<DashDoctor />} />
            <Route
              path="/doctor/:id"
              element={
                <ProtectedRoute>
                  <Doctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/PatientsSection"
              element={<PatientsSection />}
            ></Route>
            <Route path="/add-service" element={<ServicesManager />} />
            <Route path="/doctorReviews" element={<DoctorReviews />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
