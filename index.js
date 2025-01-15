const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const makeCommit = n => {
    if (n === 0) {
        // Push all commits after making them
        return simpleGit().push();
    }

    // Generate a random year between 2017 and 2022
    const year = Math.floor(Math.random() * (2023 - 2017)) + 2017;

    // Generate a random day of the year
    const dayOfYear = Math.floor(Math.random() * 365);

    // Calculate a random date for the generated year and day of year
    const DATE = moment()
        .year(year)
        .startOf('year')
        .add(dayOfYear, 'days')
        .format(); // Format the date for Git

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

// Start the commit process with 5000 commits
makeCommit(5000);
