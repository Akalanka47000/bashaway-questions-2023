const fs = require('fs');
const { faker } = require('@faker-js/faker');
const exec = require('@sliit-foss/actions-exec-wrapper').default;
const { dependencyCount, prohibitedCommands, restrictJavascript, restrictPython } = require('@sliit-foss/bashaway');

test('should check if the output is obtained from the pascal script', async () => {
    const text = faker.lorem.paragraph();
    const number = faker.number.hex({ min: 1, max: 1000 })
    fs.writeFileSync('./src/markings.pas', `program markings; \nbegin\n   writeln('${text}');\n   writeln('${number}');\nend.`);
    const result = await exec('bash execute.sh');
    expect(result?.trim()).toContain(text);
    expect(result?.trim()).toContain(number);
});

describe('should check constraints', () => {
    let script
    beforeAll(() => {
        script = fs.readFileSync('./execute.sh', 'utf-8')
    });
    test("nothing should be echoed or printed to the console", () => {
        expect(script).not.toContain("echo");
        expect(script).not.toContain("print");
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
});