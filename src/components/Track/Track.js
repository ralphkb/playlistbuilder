import React from "react";
import "./Track.css";

const Track = (props) => {
  const addTrack = (event) => {
    props.onAdd(props.track);
  };

  const removeTrack = (event) => {
    props.onRemove(props.track);
  };

  const renderAddOrRemove = () => {
    if (props.isRemoval) {
      return (
        <button className="TrackAction" onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="TrackAction" onClick={addTrack}>
        +
      </button>
    );
  };

  return (
    <div className="Track">
      <div className="TrackInfo">
        <img src={props.track.image} alt={props.track.name} className="TrackImage" />
        <h3>{props.track.name}</h3>
        <p>
          Artist: <span>{props.track.artist}</span><br />
          Album: <span>{props.track.album}</span>
        </p>
      </div>
      {renderAddOrRemove()}
    </div>
  );
};

export default Track;