// import { Theme, useTheme } from "@mui/material/styles";

// const theme = useTheme();
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

export { MenuProps, getStyles };
