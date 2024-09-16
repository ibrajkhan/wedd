// import { LazyLoadImage } from "react-lazy-load-image-component";
// import WhatsAppIcon from "../assets/Image/whatsap.png"; // Path to your WhatsApp icon
// import "./WhatsApp.css"; // Assuming you have this file for styles

// const WhatsAppButton = () => {
//   return (
//     <>
//       <div className="whatsapp-button">
//         <a
//           href="https://wa.me/8800003042"
//           target="_blank"
//           rel="noopener noreferrer">
//           <LazyLoadImage
//             src={WhatsAppIcon}
//             alt="WhatsApp"
//             className="img-fluid"
//           />
//         </a>
//       </div>
//     </>
//   );
// };

// export default WhatsAppButton;

import { LazyLoadImage } from "react-lazy-load-image-component";
import WhatsAppIcon from "../assets/Image/whatsap.png"; // Path to your WhatsApp icon
import "./WhatsApp.css"; // Assuming you have this file for styles

const WhatsAppButton = () => {
  return (
    <>
      <div className="whatsapp-button">
        <a
          href="https://wa.me/+918800003042"
          target="_blank"
          rel="noopener noreferrer">
          <LazyLoadImage
            src={WhatsAppIcon}
            alt="WhatsApp"
            className="img-fluid"
          />
        </a>
        <p className="whatsapp-text montaga-regulars">
          Connect with Hospitality Desk!
        </p>
      </div>
    </>
  );
};

export default WhatsAppButton;
