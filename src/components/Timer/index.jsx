import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const timeRightNow = new Date().getTime();

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const timer = setInterval(function () {
      const now = new Date().getTime();
      const deadline = timeRightNow + (props.choosenTime || 10000000);
      const t = deadline - now;
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((t % (1000 * 60)) / 1000);
      const updatedTimer = minutes + ":" + seconds;
      setTimer(updatedTimer);
      if (t < 0) {
        clearInterval(timer);
        const timeOut = "TIME OUT";
        setTimer(timeOut);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        width: 150,
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF",
        boxShadow: "1px 1px 25px #9E9E9E",
        margin: 5,
        borderWidth: 1,
        borderColor: "#9E9E9E",
        background: "#F2AF58",
        ...props.style,
        borderRadius: props.style.height / 2 || 75,
      }}
    >
      <h3>{timer}</h3>
    </div>
  );
};

export default Timer;
