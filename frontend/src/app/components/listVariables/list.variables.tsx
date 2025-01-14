import { useState } from "react";

export function useComponentListVariable() {
  const [items, setItems] = useState<string[]>([]);
  const [variableInput, setVariableInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const [variables, setVariables] = useState(Object);
  const [isTemplateUsed, setIsTemplateUsed] = useState(false);

  const addItem = () => {
    if (!variableInput || !valueInput) return;


    setVariables({...variables, [variableInput]: valueInput })

    setItems([...items, `${variableInput} | ${valueInput}`]);
    clearStates();
  };

  const clearStates = () => {
    setVariableInput("");
    setValueInput("");
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return {
    items,
    variableInput,
    setVariableInput,
    valueInput,
    setValueInput,
    addItem,
    handleRemoveItem,
    variables,
    isTemplateUsed,
    setIsTemplateUsed,
  };
}
