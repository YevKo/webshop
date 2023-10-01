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
    <Box sx={{ position: 'relative', marginLeft: {xs: '-16px', sm: '-24px'}, marginRight: {xs: '-16px', sm: '-24px'}}}>
        <Img alt='' src={image} width={'100%'} />
        <Paper elevation={6} sx={{ backgroundColor: 'primary.dark', padding: '2rem', maxWidth: {md: '300px'} , width: {md: '35%'}, display: {md: 'flex'}, flexDirection: {md: 'column'}, justifyContent: {md: 'center'}, position: {md: 'absolute'}, top: {md: '50%'}, left: {md: '3rem'}, transform: {md: 'translateY(-50%)'} }}>
            <Typography variant='h1' gutterBottom>{heading}</Typography>
            <Typography variant='body1' component='div'>{Parser(text)}</Typography>
        </Paper>
    </Box>
);

export default BannerWide;
