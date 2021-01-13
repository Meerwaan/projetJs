const chalk = require('chalk');

var args = process.argv;

if(args[2] !== "-action") {
    return console.log(chalk.red("[ERROR] - Le premier argument doit toujours être \"action\"."));
}