import useCalculatorStore from "../store/useCalculatorStore";

export default function SidebarWithComponent() {
  const { isOpen, toggleSidebar } = useCalculatorStore();

  const handleDragStart = (event, buttonValue) => {
    event.dataTransfer.setData("text/plain", buttonValue);
  };

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-gray-900 flex items-center p-4 shadow-xl z-50">
        <div className="relative group mt-2">
          <button
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-transform active:scale-90"
            onClick={toggleSidebar}
          >
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <span className="absolute left-full ml-2 px-1 py-0.5 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100">
            Add Buttons
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-16 left-0 w-full bg-gray-800 p-2 shadow-lg text-white max-w-xs mx-auto">
          <h2 className="text-sm mt-4 font-semibold mb-2">Drag and Drop to build your calculator</h2>
          <div className="grid grid-cols-7 gap-2 w-full">
            {["C", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((button, index) => (
              <button
                key={index}
                draggable="true"
                onDragStart={(event) => handleDragStart(event, button)}
                className="p-3 text-lg font-semibold rounded-lg shadow-lg cursor-move transition-transform active:scale-90 bg-gray-700 hover:bg-gray-600"
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
