import { exists, get, set } from "./keyvalue-db.js";

const scanRepository = async (repo, ghAccessToken, cached = true) => {
    if ((await exists(`${repo}:scan`)) && cached) {
        return {
            success: true,
            data: JSON.parse(await get(`${repo}:scan`)),
            message: "Fetched data succesfully",
        };
    }
    const response = await fetch(
        `${process.env.PY_URL}/scan?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then(async (data) => {
        return await data.json();
    });
    await set(`${repo}:scan`, JSON.stringify(response.data), 3600 * 3);
    return response;
};

const generateTestSuite = async (repo, ghAccessToken, cached = true) => {
    if ((await exists(`${repo}:testsuite`)) && cached) {
        return {
            success: true,
            data: JSON.parse(await get(`${repo}:testsuite`)),
            message: "Fetched data succesfully",
        };
    }
    const response = await fetch(
        `${process.env.PY_URL}/testsuite?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then(async (data) => {
        return await data.json();
    });
    await set(`${repo}:testsuite`, JSON.stringify(response.data), 3600 * 3);
    return response;
};

const generateDiagram = async (repo, ghAccessToken, cached = true) => {
    if ((await exists(`${repo}:diagram`)) && cached) {
        return {
            success: true,
            data: JSON.parse(await get(`${repo}:diagram`)),
            message: "Fetched data succesfully",
        };
    }
    const response = await fetch(
        `${process.env.PY_URL}/diagram?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then(async (data) => {
        return await data.json();
    });
    await set(`${repo}:diagram`, JSON.stringify(response.data), 3600 * 3);
    return response;
};

const generateReadMe = async (repo, ghAccessToken, cached = true) => {
    if ((await exists(`${repo}:readme`)) && cached) {
        return {
            success: true,
            data: JSON.parse(await get(`${repo}:readme`)),
            message: "Fetched data succesfully",
        };
    }
    const response = await fetch(
        `${process.env.PY_URL}/readme?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then(async (data) => {
        return await data.json();
    });
    await set(`${repo}:readme`, JSON.stringify(response.data), 3600 * 3);
    return response;
};

export { scanRepository, generateTestSuite, generateDiagram, generateReadMe };
