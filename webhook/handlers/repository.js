import { getUserRepositories } from "../utils/github-api.js";
import { generateTestSuite, scanRepository } from "../utils/repo-data.js";

const getRepositoriesHandler = async (req, res) => {
    const ghAccessToken = req.user.ghAccessToken;
    const repositoriesResponse = await getUserRepositories(ghAccessToken);
    if (repositoriesResponse.status >= 400) {
        return res.status(500).json({
            success: false,
            message: "Could not fetch repositories",
            data: null,
        });
    }
    const repositories = repositoriesResponse.data.map((repository) => {
        return {
            name: repository.name,
            url: repository.clone_url,
            visibility: repository.visibility,
        };
    });
    res.json({
        success: true,
        message: "Repositories fetched succesfully",
        data: {
            repositories: repositories,
        },
    });
};

const generateRepositoryDataHandler = async (req, res) => {
    const { repo } = req.query;
    const ghAccessToken = req.user.ghAccessToken;
    if (!repo || repo.trim() == "") {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required",
            data: null,
        });
    }
    const [scan, testsuite] = await Promise.all([
        scanRepository(repo, ghAccessToken),
        generateTestSuite(repo, ghAccessToken),
    ]);
    if (!scan.success) {
        return res.status(500).json({
            success: false,
            message: "An error occurred when generating vulnerability scan",
            data: null,
        });
    }
    if (!testsuite.success) {
        return res.status(500).json({
            success: false,
            message: "An error occurred when generating test suite",
            data: null,
        });
    }
    res.json({
        success: true,
        message: "Data generated succesfully",
        data: {
            scan: scan.data,
            testsuite: testsuite.data,
        },
    });
};

export { getRepositoriesHandler, generateRepositoryDataHandler };
