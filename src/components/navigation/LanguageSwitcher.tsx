import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useContext } from 'react';
import ProductContext from '../../context/ProductContext';
import i18n from '../../i18n';

const LanguageSwitcher = () => {
    const { lang, setLang } = useContext(ProductContext);

    const handleChange = (event: { target: { value: string } }) : void => {
        const newLang = event.target.value;
        setLang(newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <FormControl id="language-switcher" sx={{ m: 1 }} variant="standard">
            <Select
                labelId="select-label"
                onChange={handleChange}
                input={<OutlinedInput label={i18n.t('language')} />}
                value={lang}
            >
                <MenuItem key="fi" value="fi">FI</MenuItem>
                <MenuItem key="en" value="en">EN</MenuItem>
            </Select>
            </FormControl>
        </>
    );
}

export default LanguageSwitcher;
