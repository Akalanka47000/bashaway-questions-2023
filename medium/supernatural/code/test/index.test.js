const fs = require('fs');
const { faker } = require('@faker-js/faker');
const exec = require('@sliit-foss/actions-exec-wrapper').default;

test('should check if seraphina is cloned', async () => {
    await expect(exec('docker ps -f name=seraphina')).resolves.toContain('seraphina');
    await expect(exec('docker ps -f name=isabella')).resolves.toContain('isabella');
});

test('should check if seraphina and isabella are running', async () => {
    await expect(exec('docker ps -f name=seraphina')).resolves.toContain('Up');
    await expect(exec('docker ps -f name=isabella')).resolves.toContain('Up');
});

test('should check if the initial file within seraphina is present in isabella', async () => {
    const content = await exec('docker exec -it seraphina bash -c "cat /home/potions.txt"')
    expect(content?.trim()).toBeTruthy();
    await expect(exec('docker exec -it isabella bash -c "cat /home/potions.txt"')).resolves.toStrictEqual(content);
});

test('should check if the a file created within seraphina is present in isabella', async () => {
    const content = faker.lorem.paragraph();
    const filename = faker.system.fileName();
    await exec(`docker exec -it seraphina bash -c "echo \"${content}\" >> /twilight/${filename}"`)
    await expect(exec(`docker exec -it isabella bash -c "cat /twilight/${filename}"`)).resolves.toStrictEqual(content);
});

test("uuid generation command should be present", () => {
    const script = fs.readFileSync('./execute.sh', 'utf-8')
    const uuidGenerationLine = script.trim().split('\n').find(line => line.includes('docker exec -it seraphina bash -c "echo \"$(cat /proc/sys/kernel/random/uuid)\" >> /home/enemies.txt"' ))
    expect(uuidGenerationLine).toBeTruthy()
    expect(uuidGenerationLine).not.toContain("#")
});