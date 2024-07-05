const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const dataFilePath = path.join(__dirname, "..", "public", "data", "data.json");

const generateSlug = (name) => {
  return slugify(name, {
    replacement: "-", // replace spaces with -
    lower: true, // convert to lower case
    strict: true, // remove characters that are not alphanumeric
  });
};

const uploadData = async () => {
  try {
    // Read data.json file
    const rawData = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(rawData);

    // Ensure data.breeds is an array
    if (!Array.isArray(data.breeds)) {
      throw new Error("Data in data.json is not an array of breeds.");
    }

    // Insert each breed into the database using Prisma
    for (const breed of data.breeds) {
      // Generate a slug from the breed name
      const slug = generateSlug(breed.breedName);
      console.log(slug);

      // Include the slug in the breed data
      const breedData = {
        ...breed,
        slug: slug,
      };

      // Create the breed in the database
      await prisma.breed.create({
        data: breedData,
      });
    }

    console.log("Data uploaded successfully!");
    process.exit(0); // Exit process with success
  } catch (error) {
    console.error("Error uploading data:", error);
    process.exit(1); // Exit process with failure
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
};

uploadData();
