import React from "react";

function Result(props) {
  let stars = [0, 0, 0];
  if (props.result > 10) {
    stars.forEach(star, (index) => {
      star[index] = "<img src=../../../img-icons/star.svg></img>";
    });
  } else if (props.result > 5) {
    stars[0] = "<img src=../../../img-icons/star.svg></img>";
    stars[1] = "<img src=../../../img-icons/star.svg></img>";
  } else {
    stars[0] = "<img src=../../../img-icons/star.svg></img>";
  }
  return (
    <div>
      {stars == 3 ? (
        <p>Great job You got THREE stars</p>
      ) : stars == 2 ? (
        <p>Not bad you got Two Stars</p>
      ) : (
        <p>You got only one star</p>
      )}

      <div className="stars">{stars.map((star, index) => {})}</div>
    </div>
  );
}

export default Result;
