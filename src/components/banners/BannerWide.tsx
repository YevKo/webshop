import React from 'react';
import { Typography, styled, Box, Paper } from '@mui/material';
import Parser from 'html-react-parser';
import { ParagraphProps } from '../../types';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const BannerWide: React.FC<ParagraphProps> = ({ heading, text, image }) => (
    <Box sx={{ width: '100%', position: 'relative' }}>
        <Img alt='' src={image} width={'100%'} />
        <Paper elevation={6} sx={{ backgroundColor: 'primary.dark', maxWidth: '300px', width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem', position: 'absolute', top: '50%', left: '3rem', transform: 'translateY(-50%)' }}>
            <Typography variant='h1' gutterBottom>{heading}</Typography>
            <Typography variant='body1' component='div'>{Parser(text)}</Typography>
        </Paper>
    </Box>
);

export default BannerWide;
