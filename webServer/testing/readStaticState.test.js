const stateLoader = require('../src/state/stateLoader')
const fs = require('fs');
const path = require('path');
test('tests whether or not you can get the list of teachers',() => {
    const data = fs.readFileSync(path.join(__dirname,'../src/state/staticState.json'));
    expect(stateLoader.readAllJson()).toEqual(JSON.parse(data))
})