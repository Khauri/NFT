#!/usr/bin/env node
/*
 * Command line utility
 * Gets input file as a string and passes it to NFTJS
 * Asks nicely for specific output data from NFTJS
 * Write said data to disk
 */
let program = require('commander');
let fs = require('fs');

let NFT = require('./index');

// command line utitlity 
program
    .version('1.0.0')
    .usage('<files> [options]')
    .option('-p, --png [filename]',  'output as png')
    .option('-j, --json [filename]', 'output as json')
    .option('-x, --xml [filename]', 'output as xml')
    .option('-f, --pdf [filename]', 'output as pdf')
    .parse(process.argv);

// if no arguments return
if(!program.args.length) {
    program.help();
    process.exit(1);
} else {
    let file, nft;
    for(let i in program.args){
        file = fs.readFileSync(program.args[i], 'utf8');
        nft = new NFT(file.toString());
        //console.log(nft);
    }
}