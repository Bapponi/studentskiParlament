const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const testDir = __dirname;
const files = fs.readdirSync(testDir);
const testFiles = files.filter(file => file.endsWith('.js') && file !== 'run-tests.js');

testFiles.forEach(file => {
  console.log(`Покретање ${file}...`);
  execSync(`node ${path.join(testDir, file)}`, { stdio: 'inherit' });
});

console.log("Успешно одрађени сви тестови!")
