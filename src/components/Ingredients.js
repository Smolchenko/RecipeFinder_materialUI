import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function IngredientsSelection({
  ingredientOptions,
  setIngredientOptions,
  onClear,
}) {
  // TS  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setIngredientOptions(
      // CHECK
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",+") : value
    );
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "300px" },
      }}
      //   noValidate
      autoComplete="off"
    >
      <div>
        {/* <FormControl> ?? */}
        <TextField
          id="outlined-multiline-static"
          label="Ingredients"
          multiline
          rows={4}
          value={ingredientOptions}
          onChange={handleChange}
        />
        <FormControl name="clear">
          <IconButton
            aria-label="delete"
            color="secondary"
            size="large"
            disabled={!ingredientOptions.length}
          >
            <DeleteIcon
              type="button"
              onClick={(event) => onClear(event, "ingredients")}
            />
          </IconButton>
        </FormControl>
      </div>
    </Box>
  );
}
