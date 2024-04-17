import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faHourglass } from '@fortawesome/free-regular-svg-icons';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faTextHeight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';




const Landing = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg" id="navbb">
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center w-100 spotify">
            <div className="font_work">
            <FontAwesomeIcon icon={faTextHeight} className="ii"/>
            </div>
            <a className="navbar-brand text-center" href="/">
              TextTarka
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav justify-content-evenly navul">
              <a className="nav-link active" aria-current="page" href="#special">
                About_Us
              </a>
              <a className="nav-link active" aria-current="page" href="https://forms.gle/oqqyJST7Ewod7uM66">
              Support
              </a>
              <a className="nav-link active" aria-current="page" href="/">
                <Link to="/login">Login/signup</Link>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className=" bg">
        
        <div className="content1">
          <p>TextTarka: PDF Text Extraction & Enrichment Platform</p>
          <button className="button">
            {" "}
            <Link to="/login" className="btn">
              GET STARTED
            </Link>
          </button>
        </div>

      </div>
      <div id="special">
        <a href="/"></a>
      </div>
      <h2>Why TextTarka?</h2>

      <div className="part2">
        <div className="rectangle">
          <div className="circle">
          <FontAwesomeIcon icon={faThumbsUp}  className="ii" />
          </div>
          <h6>
            {" "}
            <b> Empower Success</b>
          </h6>
          <p>Break down goals, focusing on each step's impacts.</p>
        </div>
        <div className="rectangle">
          <div className="circle">
          <FontAwesomeIcon icon={faClockRotateLeft}  className="ii" />
          </div>
          <h6>
            {" "}
            <b>Boost Productivity</b>
          </h6>
          <p>Boost productivity with seamless integration into your workflow.</p>
        </div>
        <div className="rectangle">
          <div className="circle">
          {/* <FontAwesomeIcon icon={faMoneyBill1Wave} className="ii"/> */}
          <FontAwesomeIcon icon={faTriangleExclamation} className="ii" />
          </div>
          <h6>
            <b>Error Free</b>
          </h6>
          <p>Enjoy error-free operation with comprehensive error handling.</p>
        </div>
        <div className="rectangle">
          <div className="circle">
          {/* <FontAwesomeIcon icon={faChartLine} className="ii"/>  */}
          <FontAwesomeIcon icon={faUser} className="ii" />
          </div>
          <h6>
            <b>User Interaction</b>
          </h6>
          <p>Experience an intuitive interface for effortless navigation.</p>
        </div>
      </div>
      <div className="part3">
        {" "}
        <p>Unlock insights from your documents with just a click!!!</p>
      </div>

      <div id="special1">
        <a href="/"></a>
      </div>
      <footer className="text-center text-lg-start bg-white text-muted footer">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block font_color">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="/" className="me-4 link-secondary">
              <i className="fab fa-facebook-f font_color"></i>
            </a>
            <a href="/" className="me-4 link-secondary">
              <i className="fab fa-twitter font_color"></i>
            </a>
            <a href="/" className="me-4 link-secondary">
              <i className="fab fa-google font_color"></i>
            </a>
            <a href="/" className="me-4 link-secondary">
              <i className="fab fa-instagram font_color"></i>
            </a>
            <a href="/" className="me-4 link-secondary">
              <i className="fab fa-linkedin font_color"></i>
            </a>
            <a href="/" className="me-4 link-secondary">
              <i className="fab fa-github font_color"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 font_color">
                <FontAwesomeIcon icon={faTextHeight} className="ii"/>
                  TextTarka
                </h6>
                <p className=" font_color">
                  TextTarka extracts text from uploaded PDFs using Langchain. 
                  OpenAI enriches this text with insights. 
                  Users customize extraction and enjoy secure access. 
                  Collaboration features enhance teamwork.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4  font_color">
                  Powered By:
                </h6>
                <p className=" font_color">
                  <a href="/" className="text-reset font_color">
                    Manav Mittal
                  </a>
                </p>
                <p className=" font_color">
                  <a href="/" className="text-reset font_color">
                    Nikhil Agrawal
                  </a>
                </p>
                <p className=" font_color">
                  <a href="/" className="text-reset font_color">
                    Kushagra Gupta
                  </a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4  font_color">
                  Email-ID
                </h6>
                <p className=" font_color">
                  <a href="/" className="text-reset font_color">
                    manav.mittal_cs21@gla.ac.in
                  </a>
                </p>
                <p className=" font_color">
                  <a href="/" className="text-reset font_color">
                    nikhil.agrawal_cs21@gla.ac.in
                  </a>
                </p>
                <p className=" font_color">
                  <a href="/" className="text-reset font_color">
                    kushagra.gupta_cs21@gla.ac.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-black text-light p-4">
          <h4 className="text-center">All rights reserved &copy; TextTarka</h4>
        </div>
      </footer>
    </>
  );
};
export default Landing;