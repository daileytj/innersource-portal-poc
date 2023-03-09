import React from 'react';
import { BLUIColors } from '@brightlayer-ui/colors';
import { ScoreCard, HeroBanner, Hero, InfoListItem } from '@brightlayer-ui/react-components';
import { Star, BugReport, DinnerDining, LockOpen, Lock } from '@mui/icons-material';
import { Box, Grid, List, ListItem, ListItemText } from '@mui/material';

export const ReposGrid = ({ repos }: any): JSX.Element => (
    <Grid container spacing={2}>
        {repos.map((repo: any, index: number): JSX.Element => {
            const bugIconColor =
                repo.open_issues_count < 3
                    ? BLUIColors.green[500]
                    : repo.open_issues_count < 6
                    ? BLUIColors.yellow[500]
                    : repo.open_issues_count < 10
                    ? BLUIColors.orange[500]
                    : BLUIColors.red[500];

            const visibilityIcon =
                repo.visibility === 'public' ? <LockOpen fontSize="inherit" /> : <Lock fontSize="inherit" />;

            return (
                <Grid key={index} item sm={12} md={6} lg={4}>
                    <ScoreCard
                        headerTitle={repo.name}
                        headerSubtitle={`Language: ${repo.language}`}
                        headerInfo={<Box sx={{ pt: 0.75 }}>{visibilityIcon}</Box>}
                        badge={
                            <HeroBanner>
                                <Hero
                                    icon={<Star fontSize="inherit" sx={{ color: BLUIColors.yellow[500] }} />}
                                    label="Stars"
                                    ChannelValueProps={{ value: String(repo.stargazers_count) }}
                                    sx={{ overflow: 'visible' }}
                                />
                                <Hero
                                    icon={<BugReport fontSize="inherit" sx={{ color: bugIconColor }} />}
                                    label="Bugs"
                                    ChannelValueProps={{ value: String(repo.open_issues_count) }}
                                    sx={{ overflow: 'visible' }}
                                />
                                <Hero
                                    icon={<DinnerDining fontSize="inherit" sx={{ color: BLUIColors.lightBlue[500] }} />}
                                    label="Forks"
                                    ChannelValueProps={{ value: String(repo.forks_count) }}
                                    sx={{ overflow: 'visible' }}
                                />
                                {/* <Hero
                                    icon={<Face fontSize="inherit" sx={{ color: BLUIColors.black[500] }} />}
                                    label="Watchers"
                                    ChannelValueProps={{ value: repo.watchers_count }}
                                    sx={{ overflow: 'visible' }}
                                /> */}
                            </HeroBanner>
                        }
                        actionRow={
                            <List sx={{ p: 0 }}>
                                <InfoListItem
                                    dense
                                    chevron
                                    title="Contribute"
                                    hidePadding
                                    onClick={(): Window | null => window.open(repo.html_url, '_blank')}
                                />
                            </List>
                        }
                    >
                        <ListItem>
                            <ListItemText primary={repo.description} />
                        </ListItem>
                    </ScoreCard>
                </Grid>
            );
        })}
    </Grid>
);
