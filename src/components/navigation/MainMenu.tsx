import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

interface Page {
    name: string,
    ref: string
}

const MainMenu = ( {pages} : { pages: Page[]}) => {
    return (
        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            {pages.map(page => (
                <NavLink to={page.ref} key={page.name} className="textStyleMain" style={({isActive}) => ({padding: '10px', margin: '0 10px', display: 'block', textDecoration: isActive ? 'underline' : 'none' })}>{page.name}</NavLink>
            ))}
        </Box>
    );
}

export default MainMenu;
