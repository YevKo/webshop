import { IconButton, List, ListItem, Menu, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

interface Page {
    name: string,
    ref: string
}

const FooterMenu:React.FC< { pages: Page[], heading: string }> = ({ pages, heading }) => {

    return (
        <>
        <Typography component="h3" variant="h5">{ heading }</Typography>
        <Box
            component={List}
            display="flex"
            flexDirection="column"
        >
            { pages.map(page => (
                <ListItem key={page.name} sx={{ padding: "10px 0"}}>
                    <NavLink to={page.ref} className="textStyleSmall" >{page.name}</NavLink>
                </ListItem>
            ))}
        </Box>
        </>
    );
}

export default FooterMenu;
