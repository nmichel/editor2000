const KEY_FILENAMES = 'editor2000-filenames';
const KEY_FILENAME_PREFIX = 'editor2000-';

const Store = {
  listFilenames: () => {
    const filenames = localStorage.getItem(KEY_FILENAMES) || "[]";
    return JSON.parse(filenames);
  },

  loadFromFile: (filename) => {
    const filecontent = localStorage.getItem(`${KEY_FILENAME_PREFIX}${filename}`);
    return JSON.parse(filecontent);
  },

  saveToFile: (filename, object) => {
    const mangledFilename = `${KEY_FILENAME_PREFIX}${filename}`;
    const filecontent = JSON.stringify(object);
    localStorage.setItem(mangledFilename, filecontent);

    const filenamesBucketContent = localStorage.getItem(KEY_FILENAMES) || "[]";
    const filenames = JSON.parse(filenamesBucketContent);
    const newFilenames = filenames.includes(filename) ? filenames : [...filenames, filename]
    const newFilenamesBucketContent = JSON.stringify(newFilenames);
    localStorage.setItem(KEY_FILENAMES, newFilenamesBucketContent);
  }
};

window.Store = Store;

export default Store;
