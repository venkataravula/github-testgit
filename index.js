const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const makeCommit = n => {
    if (n === 0) {
        
        return simpleGit().push();
    }

    
    const year = Math.floor(Math.random() * (2024 - 2022)) + 2022;

    
    const dayOfYear = Math.floor(Math.random() * 365);

    
    const DATE = moment()
        .year(year)
        .startOf('year')
        .add(dayOfYear, 'days')
        .format(); 

    const data = { date: DATE };

    
    jsonfile.writeFile(FILE_PATH, data, () => {
        
        simpleGit()
            .add([FILE_PATH])
            .commit(DATE, { '--date': DATE }, () => {
                makeCommit(n - 1); 
            });
    });
};


makeCommit(1000);
