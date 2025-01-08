import React from "react";
import { Select, MenuItem, FormControl, OutlinedInput } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";

interface MultipleSelectDepartment {
  onChange: (value: string | null) => void;
}

const names = [
  "Call Center",
  "IT",
  "Human Resources",
  "Finance",
  "Quality Assurance",
];

function getStyles(name: string, personName: string | null, theme: Theme) {
  return {
    fontWeight: personName === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

const MultipleSelectDepartment: React.FC<MultipleSelectDepartment> = ({ onChange }) => {
  const theme = useTheme();
  const [departmentName, setdepartmentName] = React.useState<string | null>("");

  const handleChange = (event: SelectChangeEvent<string | null>) => {
    const selectedValue = event.target.value;
    setdepartmentName(selectedValue);
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
        value={departmentName}
        onChange={handleChange}
        input={<OutlinedInput />}
        displayEmpty
        renderValue={(selected) => (selected ? selected : <em>Select your Department</em>)}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          <em>None</em>
        </MenuItem>
        {names.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, departmentName, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectDepartment;

