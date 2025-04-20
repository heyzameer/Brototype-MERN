import { useState } from 'react';

const FormExample = () => {
  const [fruit, setFruit] = useState('apple');
  const [message, setMessage] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Fruit: ${fruit}\nMessage: ${message}\nGender: ${gender}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Select Dropdown */}
      <div>
        <label>Select a fruit: </label>
        <select value={fruit} onChange={(e) => setFruit(e.target.value)}>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </div>

      {/* Textarea */}
      <div style={{ marginTop: "10px" }}>
        <label>Your Message:</label>
        <br />
        <textarea 
          rows="4" 
          cols="30" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
      </div>

      {/* Radio Buttons */}
      <div style={{ marginTop: "10px" }}>
        <label>Select Gender:</label><br />
        <label>
          <input 
            type="radio" 
            value="male" 
            checked={gender === 'male'} 
            onChange={(e) => setGender(e.target.value)} 
          />
          Male
        </label>
        <br />
        <label>
          <input 
            type="radio" 
            value="female" 
            checked={gender === 'female'} 
            onChange={(e) => setGender(e.target.value)} 
          />
          Female
        </label>
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>Submit</button>

      {/* Output */}
      <div style={{ marginTop: "20px" }}>
        <h3>Preview:</h3>
        <p><strong>Fruit:</strong> {fruit}</p>
        <p><strong>Message:</strong> {message}</p>
        <p><strong>Gender:</strong> {gender}</p>
      </div>
    </form>
  );
};

export default FormExample;
