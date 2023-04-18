import DOMPurify from "dompurify";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function AlignItemsList({ recipes }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.paper",
        margin: "30px auto",
      }}
    >
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={recipe.title}
                src={recipe.image}
                sx={{ width: 90, height: 90 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={recipe.title}
              sx={{ marginLeft: "20px" }}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <p>{recipe.cuisine.join(", ")}</p>
                    <Link
                      href={recipe.sourceUrl}
                      variant="body2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* {recipe.spoonacularSourceUrl} */}
                      {recipe.sourceUrl}
                    </Link>
                    {/* <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(recipe.summary),
                    }}
                  /> */}
                    <p>{recipe.extendedIngredients.join(", ")}</p>
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
