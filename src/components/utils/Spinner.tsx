import { LinearProgress, Stack } from "@mui/material";

function Spinner() {
    return <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="primary" />
        <LinearProgress color="inherit" />
        <LinearProgress color="secondary" />
    </Stack>
}

export default Spinner;