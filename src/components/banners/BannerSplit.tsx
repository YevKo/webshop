import React from 'react';
import { Typography, Grid, styled, Container } from '@mui/material';
import Parser from 'html-react-parser';
import { ParagraphProps } from '../../types';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const BannerSplit: React.FC<ParagraphProps> = ({ heading, text, image, orientation }) => {
    return (
        <Container sx={{
            bgcolor: 'primary.light',
            color: 'secondary.dark',
            marginBottom: '30px'
        }}>
            <Grid container spacing={2} direction={orientation} sx={{marginTop: '0' }}>
                <Grid item md={5} sx={{ padding: '0!important'}}>
                    <Img alt='' src={image} />
                </Grid>
                <Grid item md={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Typography variant='h2' gutterBottom>{heading}</Typography>
                    <Typography variant='body1' component='div'>{Parser(text)}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BannerSplit;
