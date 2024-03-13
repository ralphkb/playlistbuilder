import React from "react";
import "./Track.css";

const Track = (props) => {
  const durationInMilliseconds = props.track.length;
  const minutes = Math.floor(durationInMilliseconds / 60000);
  const seconds = ((durationInMilliseconds % 60000) / 1000).toFixed(0);
  const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  const addTrack = (event) => {
    props.onAdd(props.track);
  };

  const removeTrack = (event) => {
    props.onRemove(props.track);
  };

  const renderAddOrRemove = () => {
    if (props.isRemoval) {
      return (
        <button className="TrackAction removeButton" onClick={removeTrack}>
          {"\u2212"}
        </button>
      );
    }
    return (
      <button className="TrackAction addButton" onClick={addTrack}>
        {"\u002B"}
      </button>
    );
  };

  return (
    <div className="Track">
      <img
        src={props.track.image}
        alt={props.track.name}
        className="TrackImage"
      />
      <div className="TrackInfo">
        <h3>{props.track.name}</h3>
        <p>
          Artist: <span>{props.track.artist}</span>
          <br />
          Album: <span>{props.track.album}</span>
          <br />
          Duration: <span>{formattedDuration}</span>
        </p>
      </div>
      {renderAddOrRemove()}
    </div>
  );
};

export default Track;
