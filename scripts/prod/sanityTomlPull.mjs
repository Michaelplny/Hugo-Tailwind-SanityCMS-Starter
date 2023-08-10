import fs from "fs";
import client from "./sanityClient.mjs";
import tomlify from "tomlify-j0.4";

export async function sanityTomlPull() {
  try {
    const [configs, links, homepg] = await Promise.all([
      client.fetch('*[_type == "siteSettings"]'),
      client.fetch('*[_type == "externalLinks"]'),
      client.fetch('*[_type == "homePage"]'),
    ]);

    const [config] = configs;
    const [link] = links;
    const [home] = homepg;

    const configObject = {
      baseURL: "/",
      languageCode: "en-us",
      title: config.title,
      description: config.description,
      params: {
        heading: home.main_heading,
        subheading: home.sub_heading,
        linkedin: link.linkedin_profile_url,
        github: link.github_profile_url,
        resume: link.resume_url,
      },
      taxonomies: {
        prgTag_lang: "programming_languages",
        prgTag_framework: "programming_frameworks",
        prgTag_project_type: "project_types",
      },
    };

    let tomlConfig = tomlify.toToml(configObject, { delims: false });

    tomlConfig = tomlConfig
      .replace("baseURL =", "# Main Site Settings\nbaseURL =")
      .replace("title =", "\n# Site Meta Settings\ntitle =")
      .replace("[params]", "\n\n[params]\n# Homepage Params:")
      .replace("linkedin =", "\n# External Links:\nlinkedin =")
      .replace("[taxonomies]", "\n\n[taxonomies]\n# Programming Tags:");

    fs.writeFileSync("config.toml", tomlConfig.trim());

    console.log("\tUpdated config.toml");
  } catch (error) {
    console.error("\tOh no, an error occurred:", error);
  }
}
