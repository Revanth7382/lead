import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark-mode");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <button className="dark-toggle-btn" onClick={toggleTheme}>
      {dark ? <FiMoon /> : <FiSun />}
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
};

export default DarkModeToggle;
