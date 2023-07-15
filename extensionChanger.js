import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const directoryPath = path.join(__dirname, 'lib', 'cjs');
const directoryPath2 = path.join(__dirname, 'lib', 'cjs', 'utils');

function renameFiles(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            const fileExtension = path.extname(filePath);

            if (fileExtension === '.js') {
                const newFilePath = filePath.replace(/\.js$/, '.cjs');

                fs.rename(filePath, newFilePath, (err) => {
                    if (err) {
                        console.error('Error renaming file:', err);
                        return;
                    }

                    fs.readFile(newFilePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        const result = data.replace(/\.d\.ts/g, '.d.cts').replace(/\.js/g, '.cjs');

                        fs.writeFile(newFilePath, result, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }
                        });
                    });
                });
            } else if (fileExtension === '.d.ts') {
                const newFilePath = filePath.replace(/\.d\.ts$/, '.d.cts');

                fs.rename(filePath, newFilePath, (err) => {
                    if (err) {
                        console.error('Error renaming file:', err);
                        return;
                    }

                    fs.readFile(newFilePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        const result = data.replace(/\.d\.ts/g, '.d.cts').replace(/\.js/g, '.cjs');

                        fs.writeFile(newFilePath, result, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }
                        });
                    });
                });
            } else if (fileExtension === '.ts') {
                const newFilePath = filePath.replace(/\.ts$/, '.cts');

                fs.rename(filePath, newFilePath, (err) => {
                    if (err) {
                        console.error('Error renaming file:', err);
                        return;
                    }

                    fs.readFile(newFilePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        const result = data.replace(/\.d\.ts/g, '.d.cts').replace(/\.js/g, '.cjs');

                        fs.writeFile(newFilePath, result, 'utf8', (err) => {
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
