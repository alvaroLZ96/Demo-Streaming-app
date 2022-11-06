import React from "react";

const Footer = () => {
  return (
    <footer>
      <ul className="footerPart1">
        <li>Home</li>
        <li>|</li>
        <li>Terms and Conditions</li>
        <li>|</li>
        <li>Privacy Policy</li>
        <li>|</li>
        <li>Collection Statement</li>
        <li>|</li>
        <li> Help</li>
        <li>|</li>
        <li>Manage Account</li>
      </ul>
      <ul className="footerPart2">
        <li>Copyright © </li>
      </ul>
      <div className="bottomDiv">
        <div className="socialmediaIcons">
          <ul className="footerPart3">
            <li>
              <img src="https://res.cloudinary.com/ddtufnl04/image/upload/v1667581755/iconos/facebook-white_wk2f9n.svg"></img>
            </li>
            <li>
              <img src="https://res.cloudinary.com/ddtufnl04/image/upload/v1667581755/iconos/twitter-white_lvenzj.svg"></img>
            </li>
            <li>
              <img src="https://res.cloudinary.com/ddtufnl04/image/upload/v1667581755/iconos/instagram-white_rkbxlq.svg"></img>
            </li>
          </ul>
        </div>
        <div className="appsIcons">
          <ul className="footerPart4">
            <li>
              <img src="https://res.cloudinary.com/ddtufnl04/image/upload/v1667581767/iconos/app-store_qyovxq.svg"></img>
            </li>
            <li>
              <img src="https://res.cloudinary.com/ddtufnl04/image/upload/v1667581767/iconos/play-store_zadvfi.svg"></img>
            </li>
            <li>
              <img src="https://res.cloudinary.com/ddtufnl04/image/upload/v1667581767/iconos/windows-store_hprxfw.svg"></img>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
