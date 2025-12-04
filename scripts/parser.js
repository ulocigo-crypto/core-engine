const fs = require('fs');
const path = require('path');

function parseFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const lines = fileContent.split('\n');
        const data = [];

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('#')) {
                const [key, value] = trimmedLine.slice(1).split('=');
                data.push({ key, value });
            } else if (!trimmedLine.startsWith('[') && !trimmedLine.startsWith('{')) {
                const value = trimmedLine.trim();
                data.push({ key: 'value', value });
            }
        }

        return data;
    } catch (error) {
        console.error(`Error parsing file: ${error.message}`);
        return null;
    }
}

function parseDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    const data = [];

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        if (fs.statSync(filePath).isFile()) {
            const fileData = parseFile(filePath);
            if (fileData !== null) {
                data.push(fileData);
            }
        } else if (fs.statSync(filePath).isDirectory()) {
            data.push(parseDirectory(filePath));
        }
    }

    return data;
}

module.exports = { parseFile, parseDirectory };