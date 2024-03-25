const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
	try {
	
		await database.category.createMany({
			data: [
				{ name: "Text Generation" },
				{ name: "Code Generation" },
				{ name: "Speech Processing" },
				{ name: "Multi Modals" },
				{ name: "Performance Tuning" },
				{ name: "Deployment" },
			],
		});

		console.log("Success");
	} catch (error) {
		console.log("Error seeding the database categories", error);
		await database.$disconnect();
		process.exit(1);
	} finally {
		await database.$disconnect();
	}
}

main();
