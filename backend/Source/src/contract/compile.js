/**
 * Compile script for the smart contract written in solicity.
 * Exports the compiled contract
 */

/**
 * The path library from NodeJs
 */
const path = require('path');

/**
 * The file system library from NodeJs
 */
const fs = require('fs');

/**
 * Importing the solidity compiler
 */
const solc = require('solc');

/**
 * Compute the path of the file Document.sol
 */
const sourcePath = path.resolve(__dirname, './Document.sol');

/**
 * Read the content of the file Document.sol
 */
const source = fs.readFileSync(sourcePath, 'utf8');

console.log('compiling ...');

/**
 * Compile the file content to solidity code (1 = optimized)
 */
const compiled = solc.compile(source, 1);

console.log('finished compiling ...');

/**
 * Export the Document part of the compiled file content (contract)
 */
module.exports = compiled.contracts[':Document'];

// The output should be something like this ...
// '[{"constant":false,"inputs":[{"name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMessage","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"newMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]'
