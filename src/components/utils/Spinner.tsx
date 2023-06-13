import { LinearProgress, Stack } from "@mui/material";

function Spinner() {
    return <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="secondary" />
        <LinearProgress color="success" />
        <LinearProgress color="inherit" />
    </Stack>
}

export default Spinner;