This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


*Backup database inside the mysql container:*
`mysqldump -u root -p --all-databases > all_databases.sql`

*Now backup your data to your local repository:*
`sudo docker cp 1f55de9398e2:/all_databases.sql /home/staging/lms-tutorial/db/ ` The same can be used opposite to copying th dump to the mysql database bash

- If on 6448H server, use
`sudo docker cp ddecd6a2e9e8:/all_databases.sql /home/akarx/lms-tutorial/docker/mysql/db`

*To backup the code*
`mysql  database_name < file.sql`

In most cases you’ll need to create a database to import into. If the database already exists, first you need to delete it.

In the following example the first command will create a database named database_name and then it will import the dump database_name.sql into it:
`needs to be done in the bash`

`mysql -u root -p -e "create database database_name";`
`mysql -u root -p database_name < database_name.sql`