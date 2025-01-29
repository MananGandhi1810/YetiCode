const scanRepository = async (repo, ghAccessToken) => {
    const response = await fetch(
        `${process.env.PY_URL}/scan?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then(async (data) => {
        return await data.json();
    });
    console.log(response);
    return response;
};

const generateTestSuite = async (repo, ghAccessToken) => {
    const response = await fetch(
        `${process.env.PY_URL}/testsuite?repo=${repo}&accessToken=${ghAccessToken}`,
    ).then(async (data) => {
        return await data.json();
    });
    console.log(response);
    return response;
};

export { scanRepository, generateTestSuite };
