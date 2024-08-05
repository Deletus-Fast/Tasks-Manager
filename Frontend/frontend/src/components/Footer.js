import * as React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                mt: 'auto',
                bottom: 0,
                backgroundColor: 'primary.main',
                color: 'white',
                py: 2,
                textAlign: 'center',
                
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1"
                sx={{
                    fontWeight: 'bold',
                    color: 'black',
                }}>
                    &copy; {new Date().getFullYear()} Unknown. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}
