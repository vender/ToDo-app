import React from "react";
import { HexColorPicker } from "react-colorful";


export const PopoverPicker = ({ color, onChange }) => {
  const popover = React.useRef();
  const [isOpen, toggle] = React.useState(false);

  return (
    <div className="picker">
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(!isOpen)}
      /> Выберите цвет

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
