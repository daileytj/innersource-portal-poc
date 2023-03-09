import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import { EmptyState } from '@brightlayer-ui/react-components';
import MenuIcon from '@mui/icons-material/Menu';
import Event from '@mui/icons-material/Event';
import { useDrawer } from '../contexts/drawerContextProvider';

export const Participate = (): JSX.Element => {
    const { setDrawerOpen } = useDrawer();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <IconButton
                        color={'inherit'}
                        onClick={(): void => {
                            setDrawerOpen(true);
                        }}
                        edge={'start'}
                        sx={{ mr: 3 }}
                        size="large"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant={'h6'} color={'inherit'}>
                        Participate
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <EmptyState icon={<Event fontSize={'inherit'} />} title={'Coming Soon'} />
            </Box>
        </Box>
    );
};
