import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { Idea } from "../models/Idea.model";

export default function IdeaCard(props: { post: Idea }) {
  return (
    <Card
      key={props.post.id}
      sx={{ mb: 2, p: 2, borderRadius: 2, border: "1px solid" }}
    >
      <CardContent sx={{ alignItems: "center" }}>
        <Avatar src="/static/images/avatar/2.jpg" />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {props.post.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ bgcolor: "#FFD700", p: 1, borderRadius: 3 }}
          >
            {props.post.description}
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a comment..."
            sx={{ mt: 1 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
