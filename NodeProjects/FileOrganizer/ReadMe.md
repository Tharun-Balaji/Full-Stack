

**File Organizer**

This command-line tool built with Node.js helps you declutter your directories by automatically sorting files based on their file types. It supports commonly used media, archives, documents, and application formats.

**Table of Contents**

- Installation: #installation
- Usage: #usage
- Supported File Types: #supported-file-types
- Commands: #commands
- Example Commands: #example-commands

**Installation**

1. **Prerequisites:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from the official Node.js website ([https://nodejs.org/en](https://nodejs.org/en)).
2. **Clone or Download the Source Code:**
   - If you have Git installed, clone the repository using `git clone <repository_url>`. Replace `<repository_url>` with the actual URL.
   - Otherwise, download the source code as a ZIP or tarball file and extract it to a convenient location on your system.

**Usage**

1. **Navigate to Project Directory:** Open your terminal or command prompt and use the `cd` command to navigate to the directory containing the `main.js` file (the core script of your File Organizer tool).
2. **Run the Tool:** Execute commands using the following syntax:

   ```bash
   node main.js <command> <directoryPath>
   ```

   - Replace `<command>` with one of the available commands (see Commands: #commands section).
   - Replace `<directoryPath>` with the absolute or relative path to the directory you want to organize.

**Supported File Types**

The tool currently recognizes and categorizes files into the following types:

- **Media**: `mp4`, `mkv`, `jpg`, `jpeg`, `png`, `gif` (added GIF support)
- **Archives**: `zip`, `7z`, `rar`, `tar`, `gz`, `ar`, `iso`, `xz`
- **Documents**: `docx`, `doc`, `pdf`, `xlsx`, `xls`, `odt`, `ods`, `odp`, `odg`, `odf`, `txt`, `ps`, `tex`
- **Applications**: `exe`, `dmg`, `pkg`, `deb`

**Commands**

The File Organizer offers the following functionalities:

- **`tree`**: Displays a tree-like structure representing the file hierarchy within the specified directory.

   **Example:**

   ```bash
   node main.js tree ~/Downloads
   ```

- **`organize`**: Sorts files in the chosen directory based on their types. Organized files are placed within a newly created subfolder named `Organized_Files` inside the original directory.

   **Example:**

   ```bash
   node main.js organize ~/Downloads
   ```

- **`help`**: Provides a list of available commands and their usage instructions.

   **Example:**

   ```bash
   node main.js help
   ```

**Example Commands**

Here are some practical demonstrations of the commands:

1. **Organize Downloads Directory:**

   ```bash
   node main.js organize ~/Downloads
   ```

   This command sorts the files in your Downloads folder (replace `~/Downloads` with the actual path if needed) and stores the organized files in a new subfolder named `Organized_Files` within the Downloads directory.

2. **View File Structure of Documents:**

   ```bash
   node main.js tree ~/Documents
   ```

   This command displays the directory tree structure of your Documents folder (replace `~/Documents` with the actual path if needed).

**Additional Considerations**

- Consider error handling in the `main.js` script to gracefully handle situations like file system permission issues, invalid paths, or unsupported file types.
- You could explore adding an option to customize the name of the `Organized_Files` subfolder to provide more user control.
- For larger directories, implementing progress indicators could enhance the user experience.

By incorporating these enhancements, you can create a more robust and user-friendly File Organizer tool.