import client from "./sanityClient.mjs";
import toMarkdown from "@sanity/block-content-to-markdown";
import yaml from "js-yaml";
import { downloadImage } from "./imageHandler.mjs";
import fs from "fs";
import path from "path";

export async function fetchAndProcessPosts(postType) {
  console.log("PostType:", postType);

  const query = postType.tags
    ? `*[_type == "${postType.sanity_type}"]{
      ...,
      ${Object.keys(postType.tags)
        .map((tag) => `"${tag}": ${tag}[]->{customSlug}`)
        .join(",\n")},
      mainImage
    }`
    : `*[_type == "${postType.sanity_type}"]{
      ...,
      mainImage
    }`;

  const posts = await client.fetch(query);

  console.log("Posts:", posts);

  for (const post of posts) {
    console.log("Post:", post);

    let imagePath = null;
    if (post.mainImage) {
      imagePath = await downloadImage(post.mainImage.asset);
    }

    const frontMatterPart1 = {
      date: post.publishedAt
        ? post.publishedAt.toISOString()
        : new Date().toISOString(),
      title: post.title !== undefined ? post.title : postType.defaultTitle,
      type: postType.hugo_type,
      draft:
        post.draft !== undefined
          ? post.draft
          : postType.defaultDraft !== undefined
          ? postType.defaultDraft
          : true,
    };

    const frontMatterPart2 = {
      image: imagePath,
      teaser: post.teaser !== undefined ? post.teaser : postType.defaultTeaser,
    };

    const frontMatterPart3 = postType.tags
      ? Object.keys(postType.tags).reduce((acc, tag) => {
          const tagKey = postType.tags[tag];
          const values = post[tag]
            ? post[tag].map((lang) =>
                lang.customSlug ? lang.customSlug.current : ""
              )
            : [];
          return {
            ...acc,
            [tagKey]: values,
          };
        }, {})
      : {};

    const bodyMarkdown = post.body ? toMarkdown(post.body) : "";

    const frontMatterStr1 = yaml.safeDump(frontMatterPart1);
    const frontMatterStr2 = yaml.safeDump(frontMatterPart2);

    console.log("Front Matter Part 1:", frontMatterPart1);
    console.log("Front Matter Part 2:", frontMatterPart2);
    console.log("Front Matter Part 3:", frontMatterPart3);

    let markdown = `---\n${frontMatterStr1.trim()}\n\n${frontMatterStr2.trim()}\n---\n${bodyMarkdown}`;

    if (Object.keys(frontMatterPart3).length !== 0) {
      const frontMatterStr3 = yaml.safeDump(frontMatterPart3);
      markdown = `---\n${frontMatterStr1.trim()}\n\n${frontMatterStr2.trim()}\n\n${frontMatterStr3.trim()}\n---\n${bodyMarkdown}`;
    }

    if (post.slug && post.slug.current) {
      const filePath = path.join(postType.dir, `${post.slug.current}.md`);
      fs.writeFileSync(filePath, markdown);
      console.log("Created: " + filePath);
    } else {
      console.log("Skipped post due to missing slug: ", post);
    }
  }
}
