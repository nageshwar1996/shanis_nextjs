import React, { useEffect } from "react";
import AOS from "aos";
import Slider from "react-slick";
import Link from "next/link";
import $ from "jquery";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/landing.css";

export default function Home() {
  const footerBanner = {
    autoplay: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    AOS.init({
      once: true,
    });

    // Menu Schroll To top
    $(document).on("click", 'a[href^="#"]', function (event) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top - 20,
        },
        300
      );
    });
  }, []);

  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);
  return (
    <>
      {/* Header Start */}
      <nav className="navbar navbar-default">
        <div className="container">
          <ul>
            <li>
              <a href="#sh_biography">BIOGRAPHY </a>
            </li>
            <li>
              <a href="#sh_discography">DISCOGRAPHY</a>
            </li>
            <li>
              <a href="javascript:void(0)">SCHOOL</a>
            </li>
            <li>
              <Link href="/signin">SIGNIN</Link>
            </li>
            <li>
              <Link href="/service">SERVICE</Link>
            </li>
            <li>
              <Link href="/privacypolicy">PRIVACY POLICY</Link>
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
          <img src="/images/mobilebnr-img.png" alt="" />
        </div>
        <ul className="social">
          <li>
            <a href="https://music.apple.com/us/album/vechorie-single/1694237261" target="_blank">
              <i className="fa-solid fa-music" />
            </a>
          </li>
          <li>
            <a href="https://open.spotify.com/track/73hqtKDw0CeZ5nRRFRfSyY?si=lDs--frBQqmLDQFLLsLqeA&nd=1" target="_blank">
              <i className="fa-brands fa-spotify" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/olga.shanis?mibextid=ZbWKwL" target="_blank">
              <i className="fa-brands fa-facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/missshanis/?igshid=MzNlNGNkZWQ4Mg%3D%3D" target="_blank">
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@missshanis" target="_blank">
              <i className="fa-brands fa-youtube" />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@msshanis?_t=8cyK7dx6Poc&_r=1" target="_blank">
              <i className="fa-brands fa-tiktok" />
            </a>
          </li>
        </ul>
      </div>
      {/* Biohraphy Start */}
      <div className="biography" id="sh_biography">
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
      <div className="shanis-became">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="text-block">
                <h4 data-aos="fade-up" data-aos-duration={1500}>
                  2013
                </h4>
                <p>
                  {" "}
                  Disney and Warner Brothers began working with the singer.
                  Shanis became the official voice of the character Elsa in the
                  movie Frozen. She has also provided soundtracks for such
                  cartoons as:
                </p>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan={2}>
                          <b>"Tinker Bell and the Pirate Fairy" </b>
                        </th>
                        <th colSpan="">Zarina</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>"Ice Age: Collision Course" </b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Brook
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>"Elena of Avalor" </b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Elena
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>"Small foot" </b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Meechee
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="img-block">
                <img src="/images/sec-3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="year_timeline">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-xl-7 col-lg-9 col-md-9 col-sm-12">
                  <div className="box">
                    <h4>2007</h4>
                    <p>
                      the singer gave her first solo concert and released an
                      album with her own and well-known hits.
                    </p>
                  </div>
                  <div className="box">
                    <h4>2009</h4>
                    <p>
                      the first video for the song “Fly to you” was released.
                    </p>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-3 col-md-3 col-sm-12">
                  <div
                    className="img-block"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                  >
                    <img src="/images/sec-4.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
              <div className="box">
                <h4>2014-2015</h4>
                <p>
                  Shanis became a soloist of the Armed Forces of Ukraine, during
                  which time the singer recorded two original songs with the
                  orchestra.
                </p>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div
                    className="img-block"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                  >
                    <img src="/images/sec4.png" alt="" />
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div
                    className="img-block"
                    data-aos="fade-right"
                    data-aos-duration={1500}
                  >
                    <img src="images/sec-4-img3.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="desc_singer">
        <div className="container">
          <p>
            {" "}
            The value of the singer is not only a wide range of her vocals, but
            also her of all genres of music –{" "}
            <span>
              pop, jazz, funk, soul, disco, rock, folk and classical singing,
            </span>{" "}
            which opens up different facets of the amazing voice like a precious
            diamond
          </p>
        </div>
      </div>
      <div className="sh_managed">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="text-block">
                <h3>
                  With her talent Shanis managed to conquer both tens of
                  thousands of listeners and the jury of prestigious
                  international competitions
                </h3>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan={2}> "Eurovision" national selection</th>
                        <th colSpan=""> 2010/2012/2014</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          "The Voice"
                        </td>
                        <td colSpan="" rowSpan="">
                          2011
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          "Chance"
                        </td>
                        <td colSpan="" rowSpan="">
                          2008
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          Ambassador from Ukraine "Slavic Bazar"
                        </td>
                        <td colSpan="" rowSpan="">
                          2010
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  In 2010, Shanis brilliantly performed the main role in the
                  biographical musical "Whitney Houston. The voice of love"
                  about the life and career of Whitney Houston.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="img-block">
                <img src="/images/img_6.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="performance">
        <div className="container">
          <p>
            {" "}
            Each performance of Shanis is always a bright event filled with{" "}
            <span>positive energy and sensual performance</span> of both lyrical
            and driving compositions
          </p>
        </div>
      </div>
      <div className="discography" id="sh_discography">
        <div className="container">
          <div className="title" data-aos="fade-up" data-aos-duration={1500}>
            <h2>Discography</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="img-block"
                data-aos="fade-right"
                data-aos-duration={1500}
              >
                <img src="/images/Frame-72.png" alt="" />
              </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12">
              <div className="text-block">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan={2}>
                          <b>1997-2008</b>
                        </th>
                        <th colSpan="">
                          Studied at classical gymnasium in Boyarka
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2003</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Finished musical school (piano class)
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2001-2008</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Studied at center of creative "Oberig" in vocal class
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2006</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          First TV show " Want to be a star"
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2007</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          ContentWinner of international song contest "Ezerski
                          bisery" (Macedonia)
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2007</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          First solo concert 2007 - Winner of the TV show
                          "Karaoke on Maidan"
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2007</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Finalist at TV show "Chance "
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2007</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Semi-Finalist of the song contest "New wave" (Urmala
                          Latvia)
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2008</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Winner of the TV show "Step to star"
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2003</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Finished musical school (piano class)
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2008-2013</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Education: Kyiv national University of culture &amp;
                          arts Master of Degree: Director of performances and
                          holidays; teacher.
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2009</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Released first music video "Fly to you"
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2009</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Participant of sport work out Tv show "Boom" in
                          Argentina
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2010</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Ambassador from Ukraine at international festival
                          "Slavic Bazar" (Vitebsk Belorus)
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2010</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Finalist of "Eurovision" national selection in Ukraine
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2011</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          Finalist of the TV show "The Voice"
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} rowSpan="">
                          <b>2011</b>
                        </td>
                        <td colSpan="" rowSpan="">
                          1place in song contest "Golden voices" in Moldova
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a className="sh_btn" href="#">
                  Show more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <div className="top-block">
            <h3>Let’s create something great together!</h3>
            <ul className="social">
              <li>
                <a href="https://music.apple.com/us/album/vechorie-single/1694237261" target="_blank">
                  <i className="fa-solid fa-music" />
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/track/73hqtKDw0CeZ5nRRFRfSyY?si=lDs--frBQqmLDQFLLsLqeA&nd=1" target="_blank">
                  <i className="fa-brands fa-spotify" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/olga.shanis?mibextid=ZbWKwL" target="_blank">
                  <i className="fa-brands fa-facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/missshanis/?igshid=MzNlNGNkZWQ4Mg%3D%3D" target="_blank">
                  <i className="fa-brands fa-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@missshanis" target="_blank">
                  <i className="fa-brands fa-youtube" />
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@msshanis?_t=8cyK7dx6Poc&_r=1" target="_blank">
                  <i className="fa-brands fa-tiktok" />
                </a>
              </li>
            </ul>
          </div>
          <div className="footter_img_slider">
            <Slider {...footerBanner}>
              <div className="item">
                <img src="/images/fot_slide1.svg" alt="" />
              </div>
              <div className="item">
                <img src="/images/fot_slide2.svg" alt="" />
              </div>
              <div className="item">
                <img src="/images/fot_slide3.png" alt="" />
              </div>
              <div className="item">
                <img src="/images/fot_slide4.svg" alt="" />
              </div>
              <div className="item">
                <img src="/images/fot_slide5.svg" alt="" />
              </div>
              <div className="item">
                <img src="/images/fot_slide6.svg" alt="" />
              </div>
              <div className="item">
                <img src="/images/fot_slide7.png" alt="" />
              </div>
              <div className="item">
                <img src="/images/fot_slide1.svg" alt="" />
              </div>
            </Slider>
          </div>
          <div
            className="mail-wrap text-center"
            data-aos="fade-up"
            data-aos-duration={1500}
          >
            <a href="mailto:prettymissshanis@gmail.com">
              prettymissshanis@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
