import React from 'react';
import { Typography, Grid, styled, Container } from '@mui/material';
import Parser from 'html-react-parser';

interface BannerProps {
    heading: string;
    text: string;
    imageSrc: string;
    orientation: 'row' | 'row-reverse';
}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const Banner: React.FC<BannerProps> = ({ heading, text, imageSrc, orientation }) => {
    return (
    <Container sx={{
            bgcolor: "primary.light",
            color: "secondary.dark",
            marginBottom: "30px"
        }}>
        <Grid container spacing={2} direction={orientation} sx={{marginTop: "0" }}>
            <Grid item md={5}>
                <Img alt="" src={imageSrc} />
            </Grid>
            <Grid item md={7}>
                <Typography variant="h2" gutterBottom>{heading}</Typography>
                <Typography variant="body1">{Parser(text)}</Typography>
            </Grid>
        </Grid>
    </Container>
);
};

export default Banner;
