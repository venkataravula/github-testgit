const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');

const FILE_PATH = './data.json';

const makeCommit = n => {
    if (n === 0) {
        // Push all commits after making them
        return simpleGit().push();
    }

    // Generate random integers for weeks and days
    const x = Math.floor(Math.random() * 55); // Random integer between 0 and 54
const y = Math.floor(Math.random() * 7);  // Random integer between 0 and 6


    // Calculate a randomized date in the past year
    const DATE = moment()
        .subtract(1, 'y') // Go back 1 year
        .add(1, 'd')      // Add 1 day (to avoid edge cases)
        .add(x, 'w')      // Add random weeks
        .add(y, 'd')      // Add random days
        .format();        // Format the date for Git

    const data = { date: DATE };

    // Write the random date to a JSON file
    jsonfile.writeFile(FILE_PATH, data, () => {
        // Stage the file, commit with the date, and recurse
        simpleGit()
            .add([FILE_PATH])
            .commit(DATE, { '--date': DATE }, () => {
                makeCommit(n - 1); // Recursive call
            });
    });
};

// Start the commit process with 100 commits
makeCommit(100);
