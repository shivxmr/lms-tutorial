const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Generative AI" },
        { name: "Android Dev" },
        { name: "Machine Learning" },
        { name: "Web Development" },
        { name: "Software Development" },
        { name: "Engineering" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
