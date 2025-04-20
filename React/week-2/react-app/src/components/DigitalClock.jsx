import React, { useEffect, useState } from 'react'

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, [])

    function formatTime() {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        const meridem = hours >= 12 ? "PM" : "AM";
      
        hours = hours % 12 || 12;
      
        // Pad seconds only
        const paddedSeconds = String(seconds).padStart(2, '0');
      
        return `${hours}:${minutes}:${paddedSeconds} ${meridem}`;
      }
      
    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000",
            padding: "50px",
            borderRadius: "8px"
        }}>
            <span style={{ color: "white", fontSize: "80px" }}>{formatTime()}</span>
        </div>

    )
}

export default DigitalClock
