const executeSequence = require("./command-sequence");
const fs = require("fs");

const repositories = loadRepositories();
createLogFolder("logs");

module.exports = (req, res) => {
    let repository = null;
    let repositoryName = null;

    try {
        repository = req.body.repository;
        repositoryName = repository.name;
    } catch (error) {
        res.status(500).send("Parsing error: " + error.message);
        return;
    }

    if (!(repositoryName in repositories)) {
        res.status(404).send("Repository \"" + repositoryName + "\" not found.");
    } else {
        res.status(200).send("OK");
        const command = repositories[repositoryName];
        executeSequence(command.commands, command.cwd, (error, stdout) => {
            writeLog(repositoryName, stdout + error);
        });
    }
};

function createLogFolder(folderName) {
    if (fs.existsSync(folderName) === false) {
        fs.mkdirSync(folderName);
    }
}

function loadRepositories() {
    const repositoriesJSON = fs.readFileSync("repositories.json");
    if (repositoriesJSON === null) {
        throw new Error("Can't read repositories.json.");
    }

    const repositories = JSON.parse(repositoriesJSON);
    return repositories;
}

function writeLog(repositoryName, text) {
    fs.writeFile(`logs/${repositoryName}.log`, text);
}
