import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({name,selectedItem,setSelectedItem,List}) {

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };
  

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`${name}-label`}>{name}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={`${name}-id`}
          value={selectedItem}
          label={`Select ${name}`}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            List?.map((e,i)=><MenuItem key={i} value={e[0]}>{e[1]}</MenuItem>)
          }
        </Select>
        <FormHelperText>{`select which ${name}'s data you want to see`}</FormHelperText>
      </FormControl>
      
    </div>
  );
}