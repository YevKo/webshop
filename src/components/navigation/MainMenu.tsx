import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface Page {
    name: string,
    ref: string
}

const MainMenu = ( {pages} : { pages: Page[]}) => {
    return (
        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            {pages.map(page => (
                <Button
                    key={page.name}
                    href={page.ref}
                    sx={{my: 2, display: 'block'}}
                >
                    {page.name}
                </Button>
            ))}
        </Box>
    );
}

export default MainMenu;
