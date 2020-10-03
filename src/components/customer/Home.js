import React from "react";

function Home(props) {
  // props.name == the restaurant name
  return (
    <div className="Home">
      <div>{props.name}</div>
    </div>
  );
}

export default Home;
