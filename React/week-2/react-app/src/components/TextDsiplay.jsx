import { useState } from 'react';

const TextDisplay = () => {
    const [text, setText] = useState('hello');

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something..."
            />

            <p>You typed: <strong>{text}</strong></p>
        </div>

        
    );
};

export default TextDisplay;
