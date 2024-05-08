import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BannerImg from "../assets/images/mobilebnr-img.png";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);
  return (
    <>
      {/* Header Start */}
      <nav className="navbar navbar-default">
        <div className="container">
          <ul>
            <li>
              <a href="#">BIOGRAPHY </a>
            </li>
            <li>
              <a href="#">DISCOGRAPHY</a>
            </li>
            <li>
              <a href="#">SCHOOL</a>
            </li>
            <li>
              <a href="#">SIGNIN</a>
            </li>
            <li>
              <a href="#">SERVICE</a>
            </li>
            <li>
              <a href="#">PRIVACY POLICY</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* Banner Start */}
      <div className="banner">
        <div className="container">
          <h1>Shanis</h1>
          <p>
            A young talented singer and songwriter with a powerful voice and an
            original performance style.
          </p>
        </div>
        <div className="img-block">
          <img src={BannerImg} alt="" />
        </div>
        <ul className="social">
          <li>
            <a href="#">
              <i className="fa-solid fa-music" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-spotify" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-youtube" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-tiktok" />
            </a>
          </li>
        </ul>
      </div>
      {/* Biohraphy Start */}
      <div className="biography">
        <div className="title" data-aos="fade-up" data-aos-duration={1500}>
          <div className="container">
            <h2>Biography</h2>
          </div>
        </div>
        <div className="inn">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div
                  className="img-block"
                  data-aos="fade-right"
                  data-aos-duration={1500}
                >
                  <img src="/images/sec-2-img-1.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="text-block">
                  <span>
                    {" "}
                    Shanis was born on August 6, 1991 in Boyarka, Kyiv region.
                  </span>
                  <h3>
                    {" "}
                    She started singing at the age of 6, when her father, a
                    musician, noticed her musical abilities and sent her to a
                    music school for piano lessons.
                  </h3>
                  <p>
                    {" "}
                    At the age of 10, she started taking vocal lessons at the
                    Oberig Art House. A variety of music always sounded at home,
                    which formed a good musical taste of the girl. She graduated
                    from the Kyiv National University of Culture and Arts with a
                    degree in theater and mass events director/teacher.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
