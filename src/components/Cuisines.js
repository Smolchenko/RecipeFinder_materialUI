// import { Theme, useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
  IconButton,
} from "@mui/material";

import cuisinesData from "../data/cuisinesData";
import { MenuProps, getStyles } from "../utils/styleUtils";

export default function CuisinesSelection({
  cuisineOptions,
  setCuisineOptions,
  onClear,
}) {
  // const theme = useTheme();
  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  const handleChange = (event) => {
    setCuisineOptions(event.target.value);
  };

  return (
    <Box
      sx={{
        "& .MuiInputBase-root": { width: "300px" },
      }}
    >
      <FormControl name="ingredients-input-text">
        <InputLabel id="cuisine-select-label">Cuisine</InputLabel>
        <Select
          labelId="cuisine-select-label"
          id="cuisine-select"
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
              // style={getStyles(cuisine, cuisineOptions, theme)}
            >
              {cuisine}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl name="clear-cuisines-button">
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
    </Box>
  );
}
