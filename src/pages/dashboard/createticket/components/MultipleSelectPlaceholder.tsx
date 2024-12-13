import React from "react";
import { Select, MenuItem, FormControl, OutlinedInput } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";

interface MultipleSelectPlaceholderProps {
  onChange: (value: string | null) => void;
}

const names = [
  "Software(Node,1Stream, etc)",
  "Hardware(Printer, Monitor, etc)",
  "Network",
  "Email",
  "Other",
];

function getStyles(name: string, personName: string | null, theme: Theme) {
  return {
    fontWeight: personName === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

const MultipleSelectPlaceholder: React.FC<MultipleSelectPlaceholderProps> = ({ onChange }) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string | null>("");

  const handleChange = (event: SelectChangeEvent<string | null>) => {
    const selectedValue = event.target.value;
    setPersonName(selectedValue);
    onChange(selectedValue); 
  };

  return (
    <FormControl
      sx={{
        ml: 2,
        mt: 2,
        width: "98%",
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#04dead",
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#04dead",
        },
      }}
    >
      <Select
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput />}
        displayEmpty
        renderValue={(selected) => (selected ? selected : <em>Select your problem</em>)}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          <em>None</em>
        </MenuItem>
        {names.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectPlaceholder;
