
 import { Image } from "react-native";

 // images
 import logo from "../assets/reader_tracker_app_logo.png";
// import LightLogo from "../assets/x_Logo_Light.png";
// import DarkLogo from "../assets/twitter_x.png";

const ThemedLogo = ({ ...props }) => {
   return (
    <Image source = {logo} {...props} style = {{width: 250, height: 250}} />
   )
}

export default ThemedLogo
