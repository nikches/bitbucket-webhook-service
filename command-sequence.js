const child_process = require("child_process");

module.exports = function executeSequence(sequence, workingDirectory, doneCallback) {
    if (doneCallback === undefined) {
        doneCallback = null;
    }

    const errorList = [];
    const stdoutList = [];

    _executeSequence(sequence, workingDirectory, 0, errorList, stdoutList, doneCallback);
}

function _executeSequence(sequence, workingDirectory, i, errorList, stdoutList, doneCallback) {
    if (i >= sequence.length) {
        const errors = errorList.join("\n\n");
        const stdout = stdoutList.join("\n\n");

        if (doneCallback !== null) {
            doneCallback(errors, stdout);
        }
        return;
    }

    if (sequence[i] === undefined || sequence[i] === null) {
        _executeSequence(sequence, workingDirectory, i + 1, errorList, stdoutList, doneCallback);
        return;
    }

    child_process.exec(sequence[i], {
        cwd: workingDirectory
    }, (error, stdout) => {
        if (error) {
            errorList.push(error);
            const errors = errorList.join("\n\n");
            const stdout = stdoutList.join("\n\n");

            if (doneCallback !== null) {
                doneCallback(errors, stdout);
            }
        } else {
            stdoutList.push(stdout);
            _executeSequence(sequence, workingDirectory, i + 1, errorList, stdoutList, doneCallback);
        }
    });
}
