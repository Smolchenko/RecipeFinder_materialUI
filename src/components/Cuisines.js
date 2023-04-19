import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import cuisinesData from "../data/cuisinesData";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
const getStyles = (cuisine, cuisineOptions, theme) => {
  return {
    fontWeight:
      cuisineOptions.indexOf(cuisine) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

export default function MultipleSelectChip({
  cuisineOptions,
  setCuisineOptions,
  name,
  onClear,
}) {
  const theme = useTheme();

  // TS  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCuisineOptions(
      // ...cuisineOptions, no need?
      // value
      // Both the above and below work

      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    // <Box
    //   component="form"
    //   xs={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    // >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControl sx={{ m: 1, width: 300 }} name={name}>
        <InputLabel id="cuisine-multiple-chip-label">Cuisine</InputLabel>
        <Select
          labelId="cuisine-multiple-chip-label"
          id="cuisine-multiple-chip"
          multiple
          value={cuisineOptions}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Cuisine" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {cuisinesData.map((cuisine) => (
            <MenuItem
              key={cuisine}
              value={cuisine}
              style={getStyles(cuisine, cuisineOptions, theme)}
            >
              {cuisine}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl name="clear">
        <IconButton
          aria-label="delete"
          color="secondary"
          size="large"
          disabled={!cuisineOptions.length}
          onClick={(event) => onClear(event, "cuisines")}
        >
          <DeleteIcon type="button" />
        </IconButton>
      </FormControl>
    </div>
    // </Box>
  );
}

// Object
// number : 10
// offset : 0
// results : (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// totalResults : 399
// [[Prototype]] : Object

// results: Array(10)
// 0: {id: 782601, title: 'Red Kidney Bean Jambalaya', image: 'https://spoonacular.com/recipeImages/782601-312x231.jpg', imageType: 'jpg'}
