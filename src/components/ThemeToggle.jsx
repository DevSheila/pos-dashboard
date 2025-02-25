import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="flex items-start gap-2 p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
      >
        {theme === "dark" ? (
          <>
            <Sun className="text-white text-xl transition-transform duration-300 transform scale-110" />
          </>
        ) : (
          <>
            <Moon className="text-gray-900 text-xl transition-transform duration-300 transform scale-110" />
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
