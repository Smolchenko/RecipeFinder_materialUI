import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Link,
  Divider,
} from "@mui/material";

export default function RecipesList({ recipes }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 600,
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
                sx={{ width: 100, height: 100 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={recipe.title}
              sx={{ marginLeft: "20px" }}
              secondary={
                <>
                  <Typography
                    component="p"
                    sx={{ marginTop: "10px" }}
                    variant="body2"
                    color="text.primary"
                  >
                    {recipe.cuisine.join(", ")}
                  </Typography>
                  <Link
                    href={recipe.sourceUrl}
                    variant="body2"
                    target="_blank"
                    rel="noopener noreferrer" // Set the link relationship attributes for security
                  >
                    {recipe.sourceUrl || recipe.spoonacularSourceUrl}
                  </Link>
                  <Typography component="p" sx={{ marginTop: "10px" }}>
                    {recipe.extendedIngredients.join(", ")}
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
