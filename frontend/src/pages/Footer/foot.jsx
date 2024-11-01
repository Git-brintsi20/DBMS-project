import React from 'react'
import"./footer.css" ;
import user from "../images/user.jpg"
import insta from "../images/instagram.png"
import twitter from "../images/twitter.png"
import facebook from "../images/facebook.png"

const Footer = () => {
  return(
<>

  <div className="footer">
  <div class="footer-grid">
    {/* <!-- Icon Section --> */}
    <div class="footer-icon-section">
      <div class="icon-item">
        <img src={user} alt="Icon 1" class="icon-img"></img>
        <p>Anupam Singh</p>
      </div>
      <div class="icon-item">
        <img src={user} alt="Icon 2" class="icon-img"></img>
        <p>Prachi</p>
      </div>
      <div class="icon-item">
        <img src={user} alt="Icon 3" class="icon-img"></img>
        <p>Harshita Bhanu</p>
      </div>
      <div class="icon-item">
        <img src={user} alt="Icon 4" class="icon-img"></img>
        <p>Prakriti Pal</p>
      </div>
      <div class="icon-item">
        <img src={user} alt="Icon 5" class="icon-img"></img>
        <p>Prasidh</p>
      </div>
    </div>

    {/* <!-- About and Contact Sections --> */}
    <div class="footer-about-section">
      <h4>About Us</h4>
      <p>We are dedicated to bringing you the best resources and information.We are a dedicated team of Aspiring Engineers aiming to skill up in the field of web development.</p>
    </div>
  
    <div class="footer-contact-section">
      <h4>Contact Us</h4>
      <p>Email: info@example.com</p>
      <p>Phone: +123 456 7890</p>
      <p className="contact-imgs">
        <img src={insta} alt="instagram" ></img> 
        <img src={twitter} alt="twitter" ></img> 
        <img src={facebook} alt="facebook" ></img> 
      </p>
    </div>

    <div className="policies">
      <h4>Policies</h4>
      <p>Privacy Policy</p>
      <p>Payments & Refunds</p>
      <p>T&C </p>
    </div>
  </div>
  <div className="footer-copyright-section">
  <p >&copy; 2024 KitabeXchange. All rights reserved.</p>
  </div>
  </div>

 
</>
  )
}
export default Footer;