import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: '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',
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

// export const getReposByOrgNameAndTopic = async (orgname = 'etn-ccis', topic = 'etn-innersource'): Promise<any | undefined> => {
//     let orgRepos: any[];
//     const enrolledRepos: any[] = [];

//     try {
//         const repos = await octokit.request('GET /orgs/{orgname}/repos', {
//             orgname: orgname,
//         });

//         if (repos && repos.status === 200) {
//             // eslint-disable-next-line no-console
//             console.log('getReposByOrgName repos.data: ', repos.data);
//         }

//         if (repos && repos.status === 200) {
//             orgRepos = repos.data;

//             orgRepos.forEach(async (_repo: any): any => {
//                 try {
//                     const topics = await octokit.request('GET /repos/{owner}/{repo}/topics', {
//                         owner: orgname,
//                         repo: _repo
//                     });

//                     if (topics && topics.status === 200) {
//                         // eslint-disable-next-line no-console
//                         console.log('getReposByOrgName repos.data: ', repos.data);
//                     }

//                     if (repos && repos.status === 200) orgRepos = repos.data;
//                     return undefined;
//                 } catch (error: any) {
//                     // eslint-disable-next-line no-console
//                     console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
//                     return undefined;
//                 }
//             });

//         }
//         return enrolledRepos;
//     } catch (error: any) {
//         // eslint-disable-next-line no-console
//         console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
//         return undefined;
//     }
// };

// export const getReposByTopic = async (topic = 'etn-innersource'): Promise<any | undefined> => {
//     try {
//         const repos = await octokit.request('GET /search/topics?q={topic}', {
//             topic: topic,
//         });

//         if (repos && repos.status === 200) {
//             // eslint-disable-next-line no-console
//             console.log('getReposByTopic repos.data: ', repos.data);
//         }

//         if (repos && repos.status === 200) return repos.data;
//         return undefined;
//     } catch (error: any) {
//         // eslint-disable-next-line no-console
//         console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
//         return undefined;
//     }
// };

export const getEtnInnersourceRepos = async (topic = 'etn-innersource'): Promise<any | undefined> => {
    try {
        const repos = await octokit.request('GET /search?q=org%3Aetn-ccis+{topic}&type=topics', {
            topic: topic,
        });

        if (repos && repos.status === 200) {
            // eslint-disable-next-line no-console
            console.log('getEtnInnersourceRepos repos.data: ', repos.data);
        }

        if (repos && repos.status === 200) return repos.data;
        return undefined;
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
        return undefined;
    }
};
