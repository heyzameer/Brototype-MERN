import { useState } from 'react';

const ColorPicker = () => {
  const [color, setColor] = useState('#ff0000'); // Default: red

  return (
    <div style={{ padding: "50px" }}>
      <h2>Pick a color:</h2>

      <input 
        type="color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)} 
      />

      <div 
        style={{
          marginTop: "20px",
          width: "150px",
          height: "150px",
          backgroundColor: color,
          border: "2px solid #000",
          borderRadius: "8px"
        }}
      ></div>

      <p>Selected Color: <strong>{color}</strong></p>
    </div>
  );
};

export default ColorPicker;
