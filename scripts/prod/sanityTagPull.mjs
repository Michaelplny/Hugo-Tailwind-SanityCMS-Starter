import client from "./sanityClient.mjs";
import fs from "fs";
import path from "path";

const tagDisplayMapPath = "./data/tag_display_map.json";

// Fetch all tags and their slugs
async function fetchAllTagsAndSlugs() {
  const tags = await client.fetch(
    `*[_type == "prgTag_lang" || _type == "prgTag_framework" || _type == "prgTag_project_type"]{
      "slug": customSlug.current,
      "title": title
    }`
  );

  return tags;
}

async function updateTagDisplayMap() {
  const tags = await fetchAllTagsAndSlugs();

  const tagDisplayMap = tags.reduce((acc, tag) => {
    acc[tag.slug] = tag.title;
    return acc;
  }, {});

  fs.writeFileSync(
    path.resolve(tagDisplayMapPath),
    JSON.stringify(tagDisplayMap, null, 2)
  );

  console.log(`\tUpdated ${tagDisplayMapPath}`);
}

export async function sanityTagPull() {
  try {
    await updateTagDisplayMap();
  } catch (error) {
    console.error("\tOh no, an error occurred:", error);
  }
}
