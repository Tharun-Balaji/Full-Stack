# File Organizer

File Organizer is a command-line tool built with Node.js that helps you organize files in a directory based on their file types. It supports organizing different types of files such as media files, archives, documents, and applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Supported File Types](#supported-file-types)
- [Commands](#commands)

## Installation

1. Make sure you have Node.js installed on your system.
2. Clone this repository or download the source code.


## Usage

To use the File Organizer tool, open the terminal/command prompt, navigate to the project directory, and run the following command:

Replace `<command>` with one of the available commands (see [Commands](#commands) section), and `<directoryPath>` with the path to the directory you want to organize.

## Supported File Types

The File Organizer tool currently supports the following file types:

- **Media**: mp4, mkv, jpg, jpeg, png
- **Archives**: zip, 7z, rar, tar, gz, ar, iso, xz
- **Documents**: docx, doc, pdf, xlsx, xls, odt, ods, odp, odg, odf, txt, ps, tex
- **Applications**: exe, dmg, pkg, deb

## Commands

The File Organizer tool supports the following commands:

### `tree`

Displays the file structure of the specified directory in a tree-like format.

### `organize`

Organizes the files in the specified directory based on their file types. The organized files will be placed in a new directory called `Organized_Files` within the specified directory.

### `help`

Displays a list of available commands and their usage.