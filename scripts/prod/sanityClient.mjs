import { createClient } from "@sanity/client";

// Create a client instance
export default createClient({
  projectId: "ymurq458",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-06-19",
});