import React from "react";
import "./styles.scss";

function Details() {
  return (
    <div className="posts-container">
      <h1>Details Page</h1>
        <div className="title">
          <p>By: Choong Lee Ann </p>
          <p>Created on: August 13, 2024</p>
        </div>
      <p>This webpage is cool and I worked really hard on it so here are some reasons why you should hire me: </p>
      <ul>
        <li>I'm hardworking and willing to learn</li>
        <li>I'm a team-player</li>
        <li>I really need an internship</li>
        <li>I met Ms Chathuri at Monash Mind-Engine Expo and bought her and the whole team a coffee :D</li>
      </ul>
      <p>Please consider my application hehe :D</p>
    </div>
  );
}

export default Details;