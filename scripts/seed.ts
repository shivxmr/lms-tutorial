import { hash } from "bcryptjs";
const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
	try {
		const password = await hash("password123", 12);
		const user = await database.user.upsert({
			where: { email: "admin@admin.com" },
			update: {},
			create: {
				email: "admin@admin.com",
				name: "Admin",
				password,
			},
		});
		console.log({ user });
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
