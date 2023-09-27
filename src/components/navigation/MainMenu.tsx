import { IconButton, List, ListItem, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useState } from 'react';
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
    <div suppressHydrationWarning={true}>

        { mobile ?
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size='large'
                aria-label='main navigation'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id='menu-appbar'
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
                    <Link href={page.ref} className='textStyleSmall' suppressHydrationWarning={true}>{page.name.toUpperCase()}</Link>
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
                        <Link href={page.ref} className='textStyleMain noUnderline'>{page.name}</Link>
                    </ListItem>
                ))}
            </Box>
        }
    </div>
    );
}

export default MainMenu;
