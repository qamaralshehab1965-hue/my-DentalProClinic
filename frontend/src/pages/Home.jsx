import "./Home.css";

function Home() {
  return (
    <div>
      <section className="hero-video">
        <video autoPlay muted loop>
          <source src="/clinc.MP4" type="video/mp4" />
        </video>

        <div className="hero-text">
          <h1>Welcome to Our Dental Clinic</h1>
          <p>Your smile is our priority</p>

          <div className="tooth">🦷</div>
        </div>
      </section>

      <section className="video-cards">
        <div className="info-card left">
          <h3>Clinic Excellence</h3>

          <p>⭐ Our clinic follows the highest hygiene standards.</p>

          <p>👨‍⚕️ Experienced dentists with international certifications.</p>

          <p>🏆 Award-winning dental specialists.</p>

          <p>🔬 Modern equipment and advanced technology.</p>
        </div>
        <div className="video-card">
          <video autoPlay muted loop playsInline>
            <source src="/4.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="video-card">
          <video autoPlay muted loop playsInline>
            <source src="/5.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="info-card right">
          <h3>Dental Care Tips</h3>

          <p>🪥 Brush your teeth twice a day.</p>

          <p>🧵 Use dental floss daily.</p>

          <p>🥗 Eat healthy foods for strong teeth.</p>

          <p>🦷 Visit the dentist regularly.</p>
        </div>
      </section>

      <section className="wide-image">
        <img src="/as.jpeg" />
      </section>

      <section className="services">
        <div className="service-card">
          <img src="/amal.jpeg" />

          <h3>Modern Equipment</h3>

          <p>
            Our clinic uses advanced dental technology to provide precise and
            comfortable treatments for our patients
          </p>
        </div>

        <div className="service-card">
          <img src="/naya.jpeg" />

          <h3>Professional Team</h3>

          <p>
            Our dentists and specialists have years of experience in modern
            dental medicine
          </p>
        </div>

        <div className="service-card">
          <img src="/11.jpeg" />

          <h3>Patient Comfort</h3>

          <p>
            We ensure every patient feels relaxed and comfortable during their
            visit to our clinic
          </p>
        </div>
      </section>

      <section className="devices">
        <div className="device-card">
          <img src="/0.jpeg" />
        </div>

        <div className="device-card">
          <img src="/10.jpeg" />
        </div>

        <div className="device-card">
          <img src="/a.jpg" />
        </div>

        <div className="device-card">
          <img src="/ha.jpeg" />
        </div>
      </section>

      <section className="technology">
        <dev className="technology-card">
          <h2>
            Our clinic is equipped with the latest dental technology and modern
            medical devices to ensure accurate diagnosis and high-quality
            treatments
          </h2>
        </dev>
      </section>

      <section className="video-cards">
        <div className="info-card right">
          <h3>Advanced Technology</h3>

          <p>🔬 Our clinic uses the latest dental technologies.</p>

          <p>🦷 High-precision equipment for accurate diagnosis.</p>

          <p>💻 Digital imaging for better treatment planning.</p>

          <p>⚙️ Modern tools that ensure faster and safer procedures.</p>
        </div>
        <div className="video-card">
          <video autoPlay muted loop playsInline>
            <source src="/9.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="video-card">
          <video autoPlay muted loop playsInline>
            <source src="/10.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="info-card left">
          <h3>Patient Comfort</h3>

          <p>😊 We focus on making every patient feel relaxed and safe.</p>

          <p>🪑 Comfortable treatment rooms designed for stress-free visits.</p>

          <p>💬 Friendly staff ready to answer all your questions.</p>

          <p>🤝 Gentle care and personal attention for every patient.</p>
        </div>
      </section>

      <section className="devices">
        <div className="device-card">
          <img src="/k.jpeg" />
        </div>

        <div className="device-card">
          <img src="/ad.jpeg" />
        </div>

        <div className="device-card">
          <img src="/ada.jpeg" />
        </div>

        <div className="device-card">
          <img src="/kaaa.jpeg" />
        </div>
      </section>

      <section className="thanks">
        <div className="thanks-card">
          <h2>Thank You For Visiting Our Website</h2>

          <p>
            We appreciate your trust in our dental clinic. Our team is always
            ready to care for your smile.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
