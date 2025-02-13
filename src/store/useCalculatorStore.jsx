import { create } from "zustand";

const useCalculatorStore = create((set) => ({
  buttons: JSON.parse(localStorage.getItem("calculatorButtons")) || [],
  expression: "",
  isOpen: false,

  setButtons: (newButtons) => {
    set({ buttons: newButtons });
    localStorage.setItem("calculatorButtons", JSON.stringify(newButtons));
  },

  setExpression: (newExpression) => set({ expression: newExpression }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCalculatorStore;
