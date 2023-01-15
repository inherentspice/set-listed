import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-links-cont">
        <div className="link">
          <a href="/">About</a>
          <a href="/">Accessibility</a>
          <a href="/">Help Center</a>
        </div>
        <div className="link">
          <a href="/">Privacy & Terms</a>
          <a href="/">Ad Choices</a>
          <a href="/">Advertising</a>
        </div>
        <div className="link">
          <a href="/">Business Services</a>
          <a href="/">More</a>
        </div>
      </div>
      <div className="company-details-cont">
        <div className="header-cont-logo">SL</div>
        <p>setListed Corp 2023</p>
      </div>
    </div>
  );
}
