import React, { useEffect } from "react";

function Result(props) {
  const result = props.result;
  const [starNum, setStarNum] = React.useState(null);
  const MessageArr = [
    "You got only one star",
    "Not bad you got Two Stars",
    "Great job You got THREE stars",
  ];

  const getResult = () =>
    setStarNum(
      (prev) => (result >= 9 && [1, 1, 1]) || (result >= 5 && [1, 1]) || [1]
    );

  const starImg = <img src="../../../img-icons/star.svg" alt="STAR"></img>;

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
