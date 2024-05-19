const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const { exec } = require('child_process');
const process = require('process');
const path = require('path');

console.log(`
    ░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓███████▓▒░░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
    ░▒▓████████▓▒░▒▓██████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
    ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓███████▓▒░░▒▓████████▓▒░ 
                                                          
                   By Zibri (2024)
`);

(async function() {
    if (process.argv.length < 3) {
        console.error('Usage: node hfdl.js <HFUser/repo> [directory]');
        console.error('Example: node hfdl.js bartowski/dolphin-2.8-mistral-7b-v02-GGUF');
        process.exit(1);
    }

    let url = process.argv[2]; // URL from command line
    const directory = process.argv[3]; // Directory from command line
    const dryRun = !directory; // Dry run if directory is not specified

    if (!dryRun) {
    	  if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
      }
    }
    // Check if aria2 is installed
    exec('aria2c --version', (error, stdout, stderr) => {
        if (error) {
            console.error('aria2 is not installed. Please install it before running this script.');
            process.exit(1);
        }
    });

    if (!url.startsWith('https://huggingface.co/')) {
        url = "https://huggingface.co/"+url+"/tree/main/"
    }

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = Array.from($('a'));

    links.forEach(link => {
        if (link.attribs.href.toLowerCase().includes('?download=true')) {
            const downloadUrl = new URL(link.attribs.href, url).href; // Resolve relative URLs
            const filename = path.basename(downloadUrl); // Extract filename from URL

            if (dryRun) {
                console.log(`File: ${filename.replace('?download=true', '')}`);
                console.log(`URL: ${downloadUrl}`);
            } else {
                exec(`aria2c -d ${directory} -o ${filename} ${downloadUrl}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error downloading file: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
            }
        }
    });

    if (dryRun) {
        console.log('\nTo download the files, a directory must be specified.');
    }
})();
