import { GENERAL_INFO } from '@/lib/data';
import { GitFork, Star } from 'lucide-react';

// Define the interface for the GitHub API response data
interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

// Define the new GitHub repository details
const GITHUB_REPO_OWNER = 'Tabishhaider72';
const GITHUB_REPO_NAME = 'Portfolio2.0';
const GITHUB_REPO_API_URL = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;
const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;

const Footer = async () => {
    let repoStats: RepoStats | null = null;

    try {
        const response = await fetch(
            GITHUB_REPO_API_URL,
            {
                // Revalidate every hour (60 * 60 seconds)
                next: { revalidate: 60 * 60 },
            },
        );

        if (!response.ok) {
            // Throw an error if the response status is not OK (e.g., 404, 500)
            throw new Error(`GitHub API returned status: ${response.status}`);
        }

        repoStats = (await response.json()) as RepoStats;
    } catch (error) {
        // Log the error but continue rendering the footer without stats
        console.error('Failed to fetch GitHub repository stats:', error);
        // repoStats remains null
    }

    // Default to 0 if the fetch failed
    const stargazers_count = repoStats?.stargazers_count || 0;
    const forks_count = repoStats?.forks_count || 0;

    return (
        <footer className="text-center pb-5" id="contact">
            <div className="container">
                <p className="text-lg">Have a project in mind?</p>
                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline"
                >
                    {GENERAL_INFO.email}
                </a>

                <div className="flex flex-col items-center justify-center">
                    <a
                        href={GITHUB_REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer" // Good practice for target="_blank"
                        className="leading-none text-muted-foreground hover:underline hover:text-white"
                    >
                        Design & built by Syed Tabish Haider
                        {/* Only display stats if the counts are available (or 0) */}
                        <div className="flex items-center justify-center gap-5 pt-1">
                            {/* Star Count */}
                            <span className="flex items-center gap-2">
                                <Star size={18} /> {stargazers_count}
                            </span>
                            {/* Fork Count */}
                            <span className="flex items-center gap-2">
                                <GitFork size={18} /> {forks_count}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;