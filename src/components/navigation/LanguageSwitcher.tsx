import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import i18n from '../../../i18n';

const LanguageSwitcher = () => {
    let { t } = useTranslation();
    const [lang, setLang] = useState<string | undefined>('fi');

    // parse locale from the route
    const router = useRouter();
    const currentLocale = router.locale;
    const { pathname, asPath, query } = router;

    // update the interface right away
    useEffect(() => {
        i18n.changeLanguage(currentLocale);
        setLang(currentLocale);
    }, [currentLocale]);

    const handleChange = (event: { target: { value: string } }) : void => {
        const newLang = event.target.value;

        // switch to the new locale
        router.push({ pathname, query }, asPath, { locale: newLang });
        setLang(newLang);
        i18n.changeLanguage(lang);

    };

    return (
        <FormControl id='language-switcher' sx={{ sx: 0, lg: 1 }} variant='standard'>
            <Select
                labelId='select-label'
                onChange={handleChange}
                input={<OutlinedInput label={t('language')} />}
                value={lang}
            >
                <MenuItem key='fi' value='fi'>FI</MenuItem>
                <MenuItem key='en' value='en'>EN</MenuItem>
            </Select>
        </FormControl>
    );
}

export default LanguageSwitcher;
