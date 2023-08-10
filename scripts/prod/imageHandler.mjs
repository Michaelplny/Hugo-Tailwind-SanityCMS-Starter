import axios from "axios";
import fs from "fs";
import path from "path";
import imageUrlBuilder from "@sanity/image-url";
import client from "./sanityClient.mjs";
import { existsSync, promises as fsPromises } from "fs";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

function loadImageDatabase() {
  if (fs.existsSync("../../data/downloadedImages.json")) {
    const rawData = fs.readFileSync("../../data/downloadedImages.json");
    return JSON.parse(rawData);
  } else {
    return {};
  }
}

function saveImageDatabase(imageDatabase) {
  const data = JSON.stringify(imageDatabase, null, 2);
  fs.writeFileSync("downloadedImages.json", data);
}

export async function downloadImage(imageRef) {
  const imageUrl = urlFor(imageRef).url();
  const imageDatabase = loadImageDatabase();
  const imageFilename = `${imageUrl.slice(-20)}`;
  const dir = "assets/images/";

  if (imageDatabase[imageFilename]) {
    // Image is already downloaded, no need to download it again
    console.log(`\tImage already downloaded: ${imageFilename}`);
    return imageFilename;
  }

  if (!existsSync(dir)) {
    await fsPromises.mkdir(dir, { recursive: true });
    console.log(`\tCreated directory: ${dir}`);
  }

  const writer = fs.createWriteStream(path.join(dir, imageFilename));

  const response = await axios({
    url: imageUrl,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => {
      // Update the image database
      imageDatabase[imageFilename] = true;
      saveImageDatabase(imageDatabase);
      console.log(`\tImage downloaded: ${imageFilename}`);
      resolve(imageFilename);
    });

    writer.on("error", (err) => {
      console.error(`\tError writing image file: ${imageFilename}`);
      reject(err);
    });

    response.data.on("error", (err) => {
      console.error(`\tError downloading image: ${imageUrl}`);
      reject(err);
    });
  });
}