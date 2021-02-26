import React from "react";
// import github from "../images/github.png";
// import linkedin from "../images/linkedin.png";
import "./About.css";
import Granny from "../images/granny.jpeg";

const About = () => {
  return (
    <>
      <div className="About">
        <p>
          Struggling to figure out what that picture you just downloaded is? Not
          hip enough to understand the latest memes?
        </p>
        <div>
          <img id="Granny" src={Granny} alt="Granny" />
        </div>
        <p>
          If this is you, Harold is here to help! Harold doesn't have the best
          vision, but he'll do his best to help you out!
        </p>
        <p id="smaller">
          (Or maybe he'll just confuse you even more...
          <br />
          If that's the case, sorry.)
        </p>
      </div>
      <div id="contact">
        <p>
          Contact me at:
          <br />
          <a href="mailto:dahc.reverse@gmail.com?subject=YOU%20ROCK!">
            dahc.reverse@gmail.com
          </a>
        </p>
        {/* <a
          href="https://github.com/losmanzanos"
          target="_blank"
          rel="noreferrer"
        >
          <img id="icon" src={github} alt="github" />
        </a>

        <a
          href="https://www.linkedin.com/in/chad-moravec/"
          target="_blank"
          rel="noreferrer"
        >
          <img id="icon" src={linkedin} alt="linkedin" />
        </a> */}
      </div>
    </>
  );
};

export default About;
