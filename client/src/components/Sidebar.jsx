import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { log, sun, moon } from "../assets";

import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  function handleThemeSwitch() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[20vh] gap-14">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#ffffff]" imgUrl={log} />
      </Link>

      <div className="flex-1 flex flex-col items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-8">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}

          <button onClick={handleThemeSwitch}>
            {theme === "dark" ? 
              <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
             : 
              <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={moon} />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
