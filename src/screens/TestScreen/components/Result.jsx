import React, { useEffect } from "react";

function Result(props) {
  const [starNum, setStarNum] = React.useState(null);
  const MessageArr = [
    "You got only one star",
    "Not bad you got Two Stars",
    "Great job You got THREE stars",
  ];

  const getResult = () => {
    if (props.result >= 9) {
      setStarNum([1, 1, 1]);
    } else if (props.result >= 5) {
      setStarNum([1, 1]);
    } else {
      setStarNum([1]);
    }
  };

  const starImg = <img src="../../../img-icons/star.svg"></img>;

  useEffect(() => {
    getResult();
  }, []);

  if (!starNum) return <p>Something went wrong</p>;
  return (
    <div>
      <p>{MessageArr[starNum.length - 1]}</p>
      <div className="stars">
        {starNum.map((star, index) => (
          <div key={index}>{starImg}</div>
        ))}
      </div>
    </div>
  );
}

export default Result;
