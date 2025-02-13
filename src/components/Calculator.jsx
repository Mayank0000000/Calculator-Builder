import { useState, useEffect, useContext } from "react";
import SidebarWithComponent from "./SideBarModal";
import { ThemeContext } from "../store/themeContext";
import useCalculatorStore from "../store/useCalculatorStore";

export default function Calculator() {
  const [buttons, setButtons] = useState([]);
  const [expression, setExpression] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext); 
 


  useEffect(() => {
    const savedButtons = localStorage.getItem("calculatorButtons");
    if (savedButtons) {
      setButtons(JSON.parse(savedButtons));
    }
  }, []);

  useEffect(() => {
    if (buttons.length > 0) {
      localStorage.setItem("calculatorButtons", JSON.stringify(buttons));
    }
  }, [buttons]);

  const handleDragOver = (event) => event.preventDefault();
  const handleDragStart = (index) => setDraggedIndex(index);

  const handleDrop = (event) => {
    event.preventDefault();
    const buttonValue = event.dataTransfer.getData("text/plain");

    if (!buttons.includes(buttonValue) && draggedIndex === null) {
      setButtons((prevButtons) => {
        const updatedButtons = [...prevButtons, buttonValue];
        localStorage.setItem("calculatorButtons", JSON.stringify(updatedButtons));
        return updatedButtons;
      });
    }
  };

  const handleButtonDrop = (event, targetIndex) => {
    event.preventDefault();

    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      const updatedButtons = [...buttons];
      const [draggedButton] = updatedButtons.splice(draggedIndex, 1);
      updatedButtons.splice(targetIndex, 0, draggedButton);
      setButtons(updatedButtons);
    }
    setDraggedIndex(null);
  };

  const handleDragEnd = (event) => {
    const calculatorZone = document.getElementById("calculator-zone");
    const rect = calculatorZone.getBoundingClientRect();

    const droppedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (draggedIndex !== null && droppedOutside) {
      const updatedButtons = [...buttons];
      updatedButtons.splice(draggedIndex, 1);
      setButtons(updatedButtons);
      localStorage.setItem("calculatorButtons", JSON.stringify(updatedButtons));
    }

    setDraggedIndex(null);
  };

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setExpression(eval(expression).toString());
      } catch {
        setExpression("Error");
      }
    } else if (value === "C") {
      setExpression("");
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen transition-all ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <SidebarWithComponent />
      <button
        onClick={toggleTheme}
        className="absolute top-80 right-8 p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-md"
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="flex-grow flex justify-center items-center p-4 md:ml-16">
        <div
          id="calculator-zone"
          className="w-full max-w-sm bg-gray-900 p-5 rounded-3xl shadow-2xl text-white flex flex-col items-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-right text-3xl md:text-4xl font-mono mb-5 p-3 bg-gray-800 rounded-lg h-16 md:h-20 w-full flex items-center justify-end shadow-inner">
            {expression || "0"}
          </div>

        <div className="grid grid-cols-4 gap-3 w-full">
            {buttons.map((button, index) => (
              <button
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleButtonDrop(event, index)}
                onDragEnd={handleDragEnd}
                onClick={() => handleButtonClick(button)}
                className={`p-3 md:p-5 text-lg md:text-2xl font-semibold rounded-xl shadow-lg transition-transform transform active:scale-90 cursor-move
                  ${
                    button === "="
                      ? "col-span-2 bg-green-500 hover:bg-green-600"
                      : button === "+" || button === "-" || button === "*" || button === "/"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
              >
                {button}
              </button>
            ))}
          </div>

          <button
            onClick={() => setExpression("")}
            className="mt-4 w-full p-3 text-lg font-semibold rounded-xl shadow-lg bg-red-500 hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
