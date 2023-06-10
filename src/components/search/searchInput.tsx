
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

interface Data {
    name: string
}

function SearchInput( {data} : { data: Data[] } ) {
    return (
        <Autocomplete
        freeSolo
        id="search"
        disableClearable
        options={data.map((option) => option.name)}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Search products"
                variant="standard"
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
            }}
            />
        )}
        />
    );
}

export default SearchInput;