const fs = require('fs');
const { faker } = require('@faker-js/faker');
const exec = require('@sliit-foss/actions-exec-wrapper').default;
const { scan, shellFiles, dependencyCount, prohibitedCommands } = require('@sliit-foss/bashaway');

let insertedIndex = -1;

beforeAll(async () => {
    if (fs.existsSync('./src')) fs.rmSync('./src', { recursive: true });
    fs.mkdirSync('./src');
    const arr = Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, 
    () => Array(faker.number.int({ min: 5, max: 10 })).fill(0).reduce((acc) => {
        acc[faker.word.noun()] = faker.word.adjective();
        return acc;
    }, {}));
    insertedIndex = faker.number.int({ min: 0, max: arr.length })
    arr.splice(insertedIndex, 0, { name: 'bashaway' });
    fs.writeFileSync('./src/grimoire.json', JSON.stringify(arr));
});

test('should validate if only bash files are present', () => {
    const shellFileCount = shellFiles().length;
    expect(shellFileCount).toBe(1);
    expect(shellFileCount).toBe(scan('**', ['src/**']).length);
});

test('should check if the index is obtained properly', async () => {
    const result = await exec('bash execute.sh');
    expect(Number(result)).toStrictEqual(insertedIndex);
});

describe('should check installed dependencies', () => {
    let script

    beforeAll(() => {
        script = fs.readFileSync('./execute.sh', 'utf-8')
    });
    test("javascript should not be used", () => {
        expect(script).not.toContain("node");
        expect(script).not.toContain("bun");
    });
    test("python should not be used", () => {
        expect(script).not.toContain("python");
        expect(script).not.toContain("python3");
    });
    test("no additional npm dependencies should be installed", async () => {
        await expect(dependencyCount()).resolves.toStrictEqual(4)
        expect(script).not.toMatch(prohibitedCommands);
    });
});