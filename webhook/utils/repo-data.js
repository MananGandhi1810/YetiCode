import { exists, get } from "./keyvalue-db.js";

const scanRepository = async (repo, ghAccessToken, cached = true) => {
    if ((await exists(`${repo}:scan`)) && cached) {
        return {
            success: true,
            data: await get(`${repo}:scan`),
            message: "Fetched data succesfully",
        };
    }
    const response = await fetch(
        `${process.env.PY_URL}/scan?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then(async (data) => {
        return await data.json();
    });
    await set(`${repo}:scan`, response.data);
    return response;
};

const generateTestSuite = async (repo, ghAccessToken, cached = false) => {
    if ((await exists(`${repo}:testsuite`)) && cached) {
        return {
            success: true,
            data: await get(`${repo}:testsuite`),
            message: "Fetched data succesfully",
        };
    }
    const response = await fetch(
        `${process.env.PY_URL}/testsuite?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then(async (data) => {
        return await data.json();
    });
    await set(`${repo}:testsuite`, response.data);
    return response;
};

export { scanRepository, generateTestSuite };
