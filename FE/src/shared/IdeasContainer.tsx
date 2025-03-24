import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import IdeaCard from "./components/IdeaCard";

export default function IdeasContainer() {
  const [filter, setFilter] = useState("controversial");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (type) => {
    setFilter(type);
    setAnchorEl(null);
  };

  const posts = [
    {
      id: 1,
      title: "Idea 1",
      description:
        "This is the first idea, lorem ipsum dolore sit amet lorem ipsum dolore sit amet, lorem lorem lorem lorem loreeeeeeeeeeeeeeeeeeeem lreasrasrarrrarara lorem ipsum doloret sit abend",
    },
    {
      id: 2,
      title: "Idea 2",
      description: "This is the second idea",
    },
  ];
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", mt: 4, color: "blue" }}
    >
      <Box
        sx={{
          width: "50%",
          p: 3,
          borderRadius: 2,
          border: "2px solid #B34FE5",
        }}
      >
        {posts.map((post) => (
          <IdeaCard post={post} />
        ))}
      </Box>
    </Box>
  );
}
