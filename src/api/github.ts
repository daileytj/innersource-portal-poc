import { Octokit } from 'octokit';

const octokit = new Octokit();
// {
//     auth: process.env.GITHUB_TOKEN,
// }

export const getReposByOrgName = async (orgname = 'etn-ccis'): Promise<any | undefined> => {
    try {
        const repos = await octokit.request('GET /orgs/{orgname}/repos', {
            orgname: orgname,
        });

        if (repos && repos.status === 200) {
            // eslint-disable-next-line no-console
            console.log('repos.data: ', repos.data);
        }

        if (repos && repos.status === 200) return repos.data;
        return undefined;
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
        return undefined;
    }
};

export const getReposByTopic = async (topic = 'etn-innersource'): Promise<any | undefined> => {
    try {
        const repos = await octokit.request('GET /search/topics?q={topic}', {
            topic: topic,
        });

        if (repos && repos.status === 200) {
            // eslint-disable-next-line no-console
            console.log('repos.data: ', repos.data);
        }

        if (repos && repos.status === 200) return repos.data;
        return undefined;
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
        return undefined;
    }
};

export const getEtnInnersourceRepos = async (topic = 'etn-innersource'): Promise<any | undefined> => {
    try {
        const repos = await octokit.request('GET /search?q=org%3Aetn-ccis+{topic}&type=topics', {
            topic: topic,
        });

        if (repos && repos.status === 200) {
            // eslint-disable-next-line no-console
            console.log('repos.data: ', repos.data);
        }

        if (repos && repos.status === 200) return repos.data;
        return undefined;
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
        return undefined;
    }
};
