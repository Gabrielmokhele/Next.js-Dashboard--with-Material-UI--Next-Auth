import React from "react";
import { Select, MenuItem, FormControl, OutlinedInput } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface MultipleSelectPlaceholderProps {
  onChange: (value: string | null) => void;
}

const MultipleSelectPlaceholder: React.FC<MultipleSelectPlaceholderProps> = ({
  onChange,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => axios.get("http://localhost:5000/subjects"),
  });

  const subjects = data?.data?.data || [];

  interface Subject {
    subject: string;
  }

  const sub: (string | null)[] = subjects.map(
    (s: Subject) => s?.subject || null
  );

  console.log("Subjects:", sub);

  const names = sub;

  function getStyles(name: string, personName: string | null, theme: Theme) {
    return {
      fontWeight:
        personName === name
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
    };
  }

  const theme = useTheme();
  const [Name, setName] = React.useState<string | null>("");

  const handleChange = (event: SelectChangeEvent<string | null>) => {
    const selectedValue = event.target.value;
    setName(selectedValue);
    onChange(selectedValue);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading subjects</div>;

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
        value={Name}
        onChange={handleChange}
        input={<OutlinedInput />}
        displayEmpty
        renderValue={(selected) =>
          selected ? selected : <em>Select your problem</em>
        }
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          <em>None</em>
        </MenuItem>
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, Name, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectPlaceholder;
