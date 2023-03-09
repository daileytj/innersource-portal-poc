import React, { useEffect, useState } from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Box,
    useTheme,
    CircularProgress,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawer } from '../contexts/drawerContextProvider';
import { /*getEtnInnersourceRepos, */ getReposByOrgName /*, getReposByTopic*/ } from '../api/github';
import { ReposGrid } from '../components/ReposGrid';

export const Repos = (): JSX.Element => {
    const theme = useTheme();
    const { setDrawerOpen } = useDrawer();
    const [isLoading, setIsLoading] = useState(false);
    const [repos, setRepos] = useState<any[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
    const [languageFilters, setLanguageFilters] = useState<string[]>([]);
    const [language, setLanguage] = useState('All');

    const clearRepoFilters = (): void => {
        setLanguage('All');
        setFilteredRepos(repos);
    };

    const getLanguageFiltersFromRepos = (): string[] => {
        const tempArr: string[] = ['All'];

        repos.forEach((repo: any) => {
            tempArr.push(repo.language);
        });

        return Array.from(new Set(tempArr));
    };

    const handleLanguageChange = (event: SelectChangeEvent): void => {
        setLanguage(event.target.value);
    };

    useEffect(() => {
        if (repos.length && language === 'All') {
            setFilteredRepos(repos);
        } else if (repos.length && language !== 'All') {
            const tempFilteredRepos = repos.filter((_repo: any) => {
                if (_repo.language === language) {
                    return _repo;
                }
            });

            setFilteredRepos(tempFilteredRepos);
        }
    }, [repos, language]);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const getAllRepos = async (): Promise<void> => {
            const eatonRepos = await getReposByOrgName();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            // const hacktoberFestRepos = await getReposByTopic('hacktoberfest');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            // const etnInnersourceRepos = await getEtnInnersourceRepos();

            if (isMounted) {
                setRepos(eatonRepos);
                setFilteredRepos(eatonRepos);
                setLanguageFilters(getLanguageFiltersFromRepos());
            }
        };
        void getAllRepos();

        setIsLoading(false);
        return (): void => {
            isMounted = false;
        };
    }, []);
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.paper,
                minHeight: '100vh',
                position: 'relative',
            }}
        >
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
                        Repositories
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
                <FormControl sx={{ minWidth: '200px' }}>
                    <InputLabel>Language</InputLabel>
                    <Select value={language} label="Language" onChange={handleLanguageChange}>
                        {languageFilters.map((_language: string, _index: number) => (
                            <MenuItem key={_index} value={_language}>
                                {_language}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={clearRepoFilters} sx={{ width: '200px', alignSelf: 'flex-end' }}>
                    Clear Filters
                </Button>
            </Box>
            <Box
                sx={{
                    p: 2,
                    minHeight: `calc(100vh - ${theme.spacing(8)})`,
                    display: 'flex',
                    [theme.breakpoints.down('sm')]: {
                        minHeight: `calc(100vh - ${theme.spacing(7)})`,
                    },
                }}
            >
                {isLoading ? <CircularProgress /> : <ReposGrid repos={filteredRepos} />}
            </Box>
        </Box>
    );
};