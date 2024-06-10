import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Track from "../Track/Track.js";

const TrackList = (props) => {
  return (
    <Box
      sx={{
        padding: "8px",
        backgroundColor: "background.paper",
        borderRadius: 4,
        boxShadow: 4,
        width: "-webkit-fill-available",
      }}
    >
      <Grid container>
        {props.tracks.map((track) => (
          <Grid item xs={12} key={track.id}>
            <Track
              track={track}
              key={track.id}
              onAdd={props.onAdd}
              isRemoval={props.isRemoval}
              onRemove={props.onRemove}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrackList;
