import { readdir, readFile, rename, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const directoryPath = path.join(__dirname, 'lib', 'cjs');
const directoryPath2 = path.join(__dirname, 'lib', 'cjs', 'utils');

function renameFiles(dirPath) {
    readdir(dirPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            const fileExtension = path.extname(filePath);

            if (fileExtension === '.js') {
                const newFilePath = filePath.replace(/\.js$/, '.cjs');

                rename(filePath, newFilePath, (err) => {
                    if (err) {
                        console.error('Error renaming file:', err);
                        return;
                    }

                    readFile(newFilePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        const result = data.replace(/\.d\.ts/g, '.d.cts').replace(/\.js/g, '.cjs');

                        writeFile(newFilePath, result, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }
                        });
                    });
                });
            } else if (fileExtension === '.d.ts') {
                const newFilePath = filePath.replace(/\.d\.ts$/, '.d.cts');

                rename(filePath, newFilePath, (err) => {
                    if (err) {
                        console.error('Error renaming file:', err);
                        return;
                    }

                    readFile(newFilePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        const result = data.replace(/\.d\.ts/g, '.d.cts').replace(/\.js/g, '.cjs');

                        writeFile(newFilePath, result, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }
                        });
                    });
                });
            } else if (fileExtension === '.ts') {
                const newFilePath = filePath.replace(/\.ts$/, '.cts');

                rename(filePath, newFilePath, (err) => {
                    if (err) {
                        console.error('Error renaming file:', err);
                        return;
                    }

                    readFile(newFilePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        const result = data.replace(/\.d\.ts/g, '.d.cts').replace(/\.js/g, '.cjs');

                        writeFile(newFilePath, result, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }
                        });
                    });
                });
            }
        });
    });
}
renameFiles(directoryPath);
renameFiles(directoryPath2);

function changeSizeBadgeInREADME() {
    const READMEPath = path.join(__dirname, 'README.md');
    const packageJSONPath = path.join(__dirname, 'package.json');

    readFile(packageJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const packageJSON = JSON.parse(data);
        const v = packageJSON.version;

        readFile(READMEPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            const result = data.replace(/@\d+(\.\d+){2}/gm, `@${v}`);

            writeFile(READMEPath, result, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
            });
        });
    });
}

changeSizeBadgeInREADME();
