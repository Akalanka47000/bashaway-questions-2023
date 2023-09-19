const fs = require('fs');
const { faker } = require('@faker-js/faker');
const exec = require('@sliit-foss/actions-exec-wrapper').default;
const { scan, shellFiles, dependencyCount, prohibitedCommands, restrictJavascript, restrictPython } = require('@sliit-foss/bashaway');

test('should validate if only bash files are present', () => {
    const shellFileCount = shellFiles().length;
    expect(shellFileCount).toBe(1);
    expect(shellFileCount).toBe(scan('**', ['src/**']).length);
});

test('should check if the records are formatted properly', async () => {
    if (!fs.existsSync('./src')) fs.mkdirSync('./src');
    const content = Array.from({ length: faker.number.int({ min: 100, max: 200 }) }).map(_ => faker.word.noun()).join('\n');
    fs.writeFileSync('./src/input.txt', content);
    const result = await exec('bash execute.sh');
    expect(result?.trim()).toStrictEqual(content.replace(/\n/g, ','));
});

describe('should check installed dependencies', () => {
    let script
    beforeAll(() => {
        script = fs.readFileSync('./execute.sh', 'utf-8')
    });
    test("javacript should not be used", () => {
        restrictJavascript(script)
    });
    test("python should not be used", () => {
        restrictPython(script)
    });
    test("no additional npm dependencies should be installed", async () => {
        await expect(dependencyCount()).resolves.toStrictEqual(4)
        expect(script).not.toMatch(prohibitedCommands);
    });
    test('the script should be less than 40 characters in length', () => {
        expect(script.length).toBeLessThan(40);
    });
});