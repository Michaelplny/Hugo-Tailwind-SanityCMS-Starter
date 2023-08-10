import fs from "fs";
import path from "path";

export function deleteMarkdownFiles(dir, exclusions) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (path.extname(file) !== ".md") continue; // Skip non-markdown files
      if (exclusions.includes(file)) continue; // Skip the files in the exclusions array

      fs.unlink(path.join(dir, file), (err) => {
        if (err) throw err;
      });
    }
  });
}
