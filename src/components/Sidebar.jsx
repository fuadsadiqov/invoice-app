import { SiReactquery } from "react-icons/si";
import { BsSun, BsMoon } from "react-icons/bs";
import { IconContext } from "react-icons";
import { BiLogoAngular } from "react-icons/bi";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { setLocalTheme } from "../helpers/localStorage";

export default function Sidebar() {
  const { dark, setDark } = useContext(ThemeContext);

  const toggleDark = () => {
    setLocalTheme(!dark);
    setDark((prevDark) => {
      prevDark = !dark
    });
  };
  return (
    <div className="bg-primary flex flex-col justify-between rounded-r-xl h-[100svh] z-[10000]">
      <IconContext.Provider value={{ size: 30, color: "white" }}>
        <div className="md:px-5 px-2 py-2 bg-purple-700 rounded-r-xl">
          <SiReactquery />
        </div>
        <div>
          <div className="md:pl-6 pl-3 cursor-pointer" onClick={toggleDark}>
            {dark ? (
              <BsSun className="iconsWithHover w-5 md:w-6" />
            ) : (
              <BsMoon className="iconsWithHover w-5 md:w-6 transit" />
            )}
          </div>
          <div className="flex justify-center border-t border-gray-300 mt-3 mb-5 pt-3">
            <a target="blank" href="https://angular.io/">
              <BiLogoAngular />
            </a>
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
}
