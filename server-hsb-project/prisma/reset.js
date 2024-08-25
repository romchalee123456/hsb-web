const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const execSync = require('child_process').execSync;

async function resetDatabase() {
  console.log('Dropping existing tables...');

  // This is a raw SQL command to drop all tables (specific to MySQL)
  await prisma.$executeRawUnsafe(`
    SET FOREIGN_KEY_CHECKS = 0;
    DROP TABLE IF EXISTS 
      file, 
      housedetail, 
      housedetailname, 
      period, 
      periodname, 
      project, 
      user, 
      customer;
    SET FOREIGN_KEY_CHECKS = 1;
  `);

  console.log('Tables dropped.');

  console.log('Running migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });

  console.log('Database reset complete.');
}

resetDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
