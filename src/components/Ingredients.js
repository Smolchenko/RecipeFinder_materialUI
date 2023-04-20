import { useState, useRef, useEffect } from "react";

import { Box, TextField, FormControl, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { cleanInputString } from "../utils/utils";

export default function IngredientsSelection({
  ingredients,
  setIngredients,
  onClear,
}) {
  const [localValue, setLocalValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = ingredients;
      setLocalValue(ingredients);
    }
  }, [ingredients]);

  // TS  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  const handleChange = (event) => {
    setLocalValue(event.target.value);
  };

  const handleBlur = (event) => {
    // if (event.type === "blur") {
    const cleanInput = cleanInputString(localValue);
    setLocalValue(cleanInput);
    setIngredients(cleanInput);
    setInputFocused(false);
    // }
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { mt: 1, width: "300px" },
        "& .MuiButtonBase-root": { mt: 1 },
      }}
    >
      <FormControl name="ingredients-input-text">
        <TextField
          id="ingredients-textfield"
          multiline
          rows={4}
          inputRef={inputRef}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setInputFocused(true)}
          aria-describedby="ingredients-textfield-selection-text"
          label="Ingredients"
          InputLabelProps={{
            shrink: Boolean(localValue) || inputFocused,
            htmlFor: "ingredients-textfield",
          }}
        />
      </FormControl>
      <FormControl name="clear-ingredients-button">
        <IconButton
          aria-label="delete"
          color="secondary"
          size="large"
          disabled={!ingredients.length}
          onClick={(event) => onClear(event, "ingredients")}
        >
          <DeleteIcon type="button" />
        </IconButton>
      </FormControl>
    </Box>
  );
}
