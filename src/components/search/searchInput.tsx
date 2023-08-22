
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
interface DataOption {
    id: number,
    name: string,
    category: string,
    uri: string
}

function SearchInput( { data } : { data: DataOption[] } ) {
    return (
        <>
        <Autocomplete
            id="search"
            selectOnFocus
            clearOnBlur
            fullWidth
            noOptionsText="Nothing found"
            options={data}
            getOptionLabel={(option: DataOption) => option.name }
            groupBy={(option : DataOption) => option.category.toUpperCase()}
            renderOption={(props, option) => (
                <li {...props}>
                    <Link key={option.id} to={option.uri} className="textStyleSmall">{option.name}</Link>
                </li>
            )}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={i18n.t('search.placeholder')}
                    variant="standard"
                    InputLabelProps={{ }}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        endAdornment: (
                            <InputAdornment position='end' sx={{ width: '24px' }}>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            }
        />
        </>
    );
}

export default SearchInput;