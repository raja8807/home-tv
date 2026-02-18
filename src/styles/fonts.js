import { Poppins as MainFont, DM_Sans as HeadFont } from "next/font/google";
// import { Inder as Be_Vietnam_Pro } from "next/font/google";

const mainFont = MainFont({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
const headFont = HeadFont({
  weight: ["400"],
  subsets: ["latin"],
});

const fonts = {
  MainFont: mainFont.className,
  HeadFont: headFont.className,
};
export default fonts;
