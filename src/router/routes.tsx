import { Repos, ContributionDocs, Participate } from '../pages';
import Code from '@mui/icons-material/Code';
import Assignment from '@mui/icons-material/Assignment';
import EmojiPeople from '@mui/icons-material/EmojiPeople';

export const PAGES = [
    {
        title: 'Repositories',
        route: '',
        component: Repos,
        icon: Code,
    },
    {
        title: 'Contribution Docs',
        route: 'contribution-docs',
        component: ContributionDocs,
        icon: Assignment,
    },
    {
        title: 'Participate',
        route: 'participate',
        component: Participate,
        icon: EmojiPeople,
    },
];
