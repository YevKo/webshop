import { IconButton, List, ListItem, Menu, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';

interface Page {
    name: string,
    ref: string
}

const FooterMenu:React.FC< { pages: Page[], heading: string }> = ({ pages, heading }) => {

    return (
        <>
            <Typography component='h3' variant='h5'>{ heading }</Typography>
            <Box
                component={List}
                display='flex'
                flexDirection='column'
            >
                { pages.map(page => (
                    <ListItem key={page.name} sx={{ padding: '10px 0'}}>
                        <Link href={page.ref} className='textStyleSmall' >{page.name}</Link>
                    </ListItem>
                ))}
            </Box>
        </>
    );
}

export default FooterMenu;
