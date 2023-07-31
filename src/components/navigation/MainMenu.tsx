import { IconButton, List, ListItem, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

interface Page {
    name: string,
    ref: string
}
interface MainMenuProps {
    pages: Page[],
    mobile? : boolean;
}

const MainMenu:React.FC<MainMenuProps> = ({ pages, mobile=false }) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
    <>

        { mobile ?
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="main navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: {xs: 'block', md: 'none'} }}
            >
            { pages.map(page => (
                <MenuItem key={page.name} >
                    <NavLink to={page.ref} className="textStyleSmall">{page.name}</NavLink>
                </MenuItem>
            ))}
            </Menu>
            </Box>
        :
            <Box
                component={List}
                sx={{ display: {xs: 'none', md: 'flex'} }}
            >
                { pages.map(page => (
                    <ListItem key={page.name} >
                        <NavLink to={page.ref} className="textStyleMain" style={({isActive}) => ({padding: '10px', margin: '0 10px', display: 'block', textDecoration: isActive ? 'underline' : 'none' })}>{page.name}</NavLink>
                    </ListItem>
                ))}
            </Box>
        }
    </>
    );
}

export default MainMenu;
