import { useState, useRef, useEffect } from "react";
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
  //   const handleChange = (event) => {
  //     const {
  //       target: { value },
  //     } = event;

  //     setIngredientOptions(
  //       // CHECK
  //       // On autofill we get a stringified value.
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //   };
  const [localValue, setLocalValue] = useState(ingredientOptions);
  const inputRef = useRef();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocalValue(typeof value === "string" ? value.split(",") : value);

    const cleanInput = value
      .replace(/[^a-zA-Z]+/g, ",")
      .replace(/[\s\n]+/g, "")
      .trim();
    if (event.type === "blur") {
      setIngredientOptions(cleanInput);
      //   setLocalValue(ingredientOptions);
      //   event.target.value = ingredientOptions;
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = ingredientOptions;
      setLocalValue(ingredientOptions);
    }
  }, [ingredientOptions]);

  return (
    <Box
      //   component="form"
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
          //   value={ingredientOptions}
          value={localValue}
          inputRef={inputRef}
          onChange={handleChange}
          onBlur={handleChange}
        />
        <FormControl name="clear">
          <IconButton
            aria-label="delete"
            color="secondary"
            size="large"
            disabled={!ingredientOptions.length}
            onClick={(event) => onClear(event, "ingredients")}
          >
            <DeleteIcon type="button" />
          </IconButton>
        </FormControl>
      </div>
    </Box>
  );
}
