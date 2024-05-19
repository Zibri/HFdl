# HuggingFace Downloader (HFDL)

Welcome to the **HuggingFace Downloader Deluxe (HFDL)**, the only tool you'll ever need to download models from HuggingFace with more flair than a peacock at a bird show! 🦚

## What is HFDL?

HFDL is a Node.js script that's as eager to download HuggingFace models as a kid in a candy store. It's like a digital treasure hunter, but instead of gold, it's after those precious model files.
Since I don't like the "HF way", here is a faster way to download a full directory from HF using aria2c for speed.

## Features

- **Command-line savvy**: Just give it a HuggingFace repo, and it'll do the rest.
- **Directory support**: Want to organize your downloads? HFDL respects your need for order in the chaos of your filesystem.
- **Dry run option**: Just testing the waters? HFDL can simulate downloads for you, because who doesn't like a good dress rehearsal?
- **Aria2 integration**: This script is best buddies with Aria2, ensuring your downloads are faster than a cheetah.

## How to Use

1. Make sure you have Node.js and Aria2 installed.
2. Clone this repo..
3. Run the script with the following command:
   ```bash
   node hfdl.js <HFUser/repo> [directory]

Replace <HFUser/repo> with the HuggingFace repository you want to clone, and [directory] with the place you want to stash your loot.

Example
node hfdl.js zibri/awesome-model-2024 models

If the directory is not specified, the directory will be listed with all the direct links.

Disclaimer
This script is provided “as is”, with no warranty that it will not download the entire internet by accident. Use at your own risk, and always wear a helmet.

Credits
Crafted with care by Zibri, who believes that every model deserves a cozy home on your hard drive.

License
This project is so free it doesn’t even know what restrictions mean. Distributed under the ISC License. See LICENSE for more information.

