import { generateDiagram, generateTestSuite, scanRepository } from "../utils/repo-data.js";
import { set } from "../utils/keyvalue-db.js";
import sendEmail from "./email.js";

const processData = async (repo, repoData, email) => {
    console.log("Processing");
    const [scan, testSuites, diagram] = await Promise.all([
        scanRepository(repo, repoData.user.ghAccessToken, false),
        generateTestSuite(repo, repoData.user.ghAccessToken, false),
        generateDiagram(repo, repoData.user.ghAccessToken, false)
    ]);

    await set(`${repo}:scan`, JSON.stringify(scan), 3600 * 3);
    await set(`${repo}:testsuite`, JSON.stringify(testSuites), 3600 * 3);
    await set(`${repo}:diagram`, JSON.stringify(diagram), 3600 * 3);

    sendEmail(
        email,
        "Your data is ready",
        `<h1>Data for ${repo}</h1><br>Your data for ${repo} is ready, log in to the dashboard to view the details`,
    );
    console.log("Sent email");
};

export { processData };
