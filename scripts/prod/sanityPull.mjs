import { fetchAndProcessPosts } from "./postHandler.mjs";
import { postTypes } from "./postTypes.mjs";
import { deleteMarkdownFiles } from "./fileDeleter.mjs";
import { sanityTagPull } from "./sanityTagPull.mjs";
import { sanityTomlPull } from "./sanityTomlPull.mjs";

// Execute sanityTomlPull
console.log("🔨 Building Toml File ...")
sanityTomlPull().catch((err) => console.error("Oh no, an error occurred:", err));

// Execute sanityTagPull
console.log("⬇ Pulling Tags ...")
sanityTagPull().catch((err) => console.error("Oh no, an error occurred:", err));

// Delete existing markdown files
console.log("❌ Deleting Markdown Files ...")
const dir = "./content/portfolios/";
const exclusions = ["_index.md", "c-sharp.md"]; // Add more filenames to this array as needed
deleteMarkdownFiles(dir, exclusions);

// Fetch and process posts for each type
console.log("🦴 Fetching data and building Markdown Files ...")
postTypes.forEach((postType) => {
  fetchAndProcessPosts(postType).catch((err) =>
    console.error("Oh no, an error occurred:", err)
  );
});
