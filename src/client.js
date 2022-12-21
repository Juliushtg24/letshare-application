import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "mcqvz4a3",
  dataset: "production",
  apiVersion: "1",
  useCdn: true,
  token:
    "sklXNU9DTQ8kRlNkvmE3YjkWLhBCg1KDr2fJ8m4lsfF0YJY2XbRE5jS6sopHE1T78fGCOOfg1JIoUyOn3vEMbfrOQ2F6jKlj4aaNyg49aiWyVuD2XZPoqwdpnZC5QP7w5ui1EQeSKhI4842lRA5dWd9IN6WjWPo14Vk4mNqF9DpLNbShzChW",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
