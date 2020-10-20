const apiKeyDistributer = require('../src/verification/genApiKey');
const apiKeyDecoder = require('../src/verification/decryoptApiKey');
test("testing api key verification and distibutuion",() => {

    let key = apiKeyDistributer.addNewKey("tester");
    console.log(key);
    key = apiKeyDecoder.verifyFunc(key);
    expect(key).toStrictEqual({ teacher: 'tester', iat: Math.floor(+new Date() / 1000), exp: Math.floor(+new Date() / 1000)+86400, "permition": 1 });
})