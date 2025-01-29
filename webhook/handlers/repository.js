import { createWebhook, getUserRepositories } from "../utils/github-api.js";
import { generateTestSuite, scanRepository } from "../utils/repo-data.js";
import { v4 as uuid4 } from "uuid";

const getRepositoriesHandler = async (req, res) => {
  try {
    const ghAccessToken = req.user.ghAccessToken;
    const repositoriesResponse = await getUserRepositories(ghAccessToken);

    if (repositoriesResponse.status >= 400) {
      return res.status(500).json({
        success: false,
        message: "Could not fetch repositories",
        data: null,
      });
    }

    const repositories = repositoriesResponse.data.map((repository) => ({
      name: repository.name,
      url: repository.clone_url,
      visibility: repository.visibility,
    }));

    res.json({
      success: true,
      message: "Repositories fetched successfully",
      data: { repositories },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

const generateRepositoryWebHookHandler = async (req, res) => {
  try {
    const { repo } = req.query;
    const ghAccessToken = req.user.ghAccessToken;

    if (!repo || repo.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Repository URL is required",
        data: null,
      });
    }

    const id = uuid4();
    const webhookRequest = await createWebhook(id, ghAccessToken, repo);

    res.json({
      success: true,
      message: "Webhook created successfully",
      data: webhookRequest.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create webhook",
      error: error.message,
    });
  }
};

const generateRepositoryDataHandler = async (req, res) => {
  try {
    const { repo } = req.query;
    const ghAccessToken = req.user.ghAccessToken;

    if (!repo || repo.trim() === "") {
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
      message: "Data generated successfully",
      data: {
        scan: scan.data,
        testsuite: testsuite.data,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

export {
  getRepositoriesHandler,
  generateRepositoryWebHookHandler,
  generateRepositoryDataHandler,
};
