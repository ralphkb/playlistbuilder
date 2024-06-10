import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function Track(props) {
  const durationInMilliseconds = props.track.length;
  const minutes = Math.floor(durationInMilliseconds / 60000);
  const seconds = ((durationInMilliseconds % 60000) / 1000).toFixed(0);
  const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  const addedAt = props?.track?.addedAt;
  let formattedAddedAt = undefined;
  if (addedAt) {
    const date = new Date(addedAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
    formattedAddedAt = date.toLocaleDateString("en-US", options);
  }
  const addTrack = (event) => {
    props.onAdd(props.track);
  };

  const removeTrack = (event) => {
    props.onRemove(props.track);
  };

  const renderAddOrRemove = () => {
    const AddIconButton = (props) => (
      <IconButton {...props} aria-label="add">
        <AddCircleIcon sx={{ height: 38, width: 38 }} />
      </IconButton>
    );
    const RemoveIconButton = (props) => (
      <IconButton {...props} aria-label="remove">
        <RemoveCircleIcon sx={{ height: 38, width: 38 }} />
      </IconButton>
    );
    if (props.isRemoval) {
      return <RemoveIconButton onClick={removeTrack} />;
    }
    return <AddIconButton onClick={addTrack} />;
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "0px",
        marginTop: "-1px",
        backgroundImage: "none",
        "&:hover": {
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          borderRadius: "8px",
          backgroundColor: "rgba(26,26,26,255)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 96,
          height: 96,
          marginLeft: "0.8rem",
          display: "flex",
          borderRadius: "5px",
          backgroundColor: "#121212",
        }}
        image={props.track.image}
        alt={props.track.name}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.track.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.track.artist}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            Album: {props.track.album}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            Length: {formattedDuration}
          </Typography>
          {formattedAddedAt && (
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              Date Added: {formattedAddedAt}
            </Typography>
          )}
        </CardContent>
      </Box>
      <Box sx={{ ml: "auto", pr: "0.8rem" }}>{renderAddOrRemove()}</Box>
    </Card>
  );
}
