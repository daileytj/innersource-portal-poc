import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export const getReposByOrgName = async (orgname = 'etn-ccis'): Promise<any | undefined> => {
    try {
        const repos = await octokit.request('GET /orgs/{orgname}/repos', {
            orgname: orgname,
        });

        if (repos && repos.status === 200) {
            // eslint-disable-next-line no-console
            console.log('getReposByOrgName repos.data: ', repos.data);
        }

        if (repos && repos.status === 200) return repos.data;
        return undefined;
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
        return undefined;
    }
};

export const getRepoTopics = async (_owner = 'etn-ccis', _repo: string): Promise<any | undefined> => {
    try {
        const topics = await octokit.request('GET /repos/{owner}/{repo}/topics', {
            owner: _owner,
            repo: _repo,
        });

        if (topics && topics.status === 200) return topics.data;
        return undefined;
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
        return undefined;
    }
};

export const getReposByTopic = async (
    _topic = 'etn-innersource',
    _repos: any,
    _owner = 'etn-ccis'
): Promise<any | undefined> => {
    const participatingRepos: any[] = [];

    await _repos.forEach(async (_repo: any) => {
        const repoTopics = await getRepoTopics(_owner, _repo.name);

        if (repoTopics.names.includes(_topic)) {
            participatingRepos.push(_repo);
        }
    });

    return participatingRepos;
};

// get repos by topic without looking up every repo
// https://api.github.com/search/repositories?accept=application/vnd.github.v3+json&q=archived:false+topic:eaton-innersource+sort:created-desc
