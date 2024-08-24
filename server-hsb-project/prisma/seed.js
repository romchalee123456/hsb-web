const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed housedetailname
  const houseDetailName1 = await prisma.housedetailname.create({
    data: {
      houseDetailName: 'Example House Detail Name 1',
    },
  });

  // Seed housedetail
  const houseDetail1 = await prisma.housedetail.create({
    data: {
      houseDetailname: {
        connect: { houseDetailNameid: houseDetailName1.houseDetailNameid },
      },
    },
  });

  // Seed file
  const file1 = await prisma.file.create({
    data: {
      fileName: 'Example File 1',
      filePath: 'https://media.graphassets.com/IIsouWSvSPWxdgkPhi3A',
      statusId: 1,
      houseDetailId: houseDetail1.houseDetailid,
      backUpStatus: 0,
      fileBackupPath: 'https://media.graphassets.com/IIsouWSvSPWxdgkPhi3A',
    },
  });

  // Seed periodname
  const periodName1 = await prisma.periodname.create({
    data: {
      periodName: 'งวด 1',
    },
  });

  // Seed project
  const project1 = await prisma.project.create({
    data: {
      projectName: 'บ้านทรัพย์อนัน-คุณกลาง',
      projectCode: 'PRJ001',
      description: 'บ้านคุณกลาง ',
      createOn: new Date(),
      amount: 1000.0,
    },
  });

  // Seed period
  const period1 = await prisma.period.create({
    data: {
      description: 'งวดที่ 1',
      createOn: new Date(),
      periodStatusId: 1,
      periodnameid: periodName1.periodNameid,
      projectid: project1.projectid,
    },
  });

  // Seed user
  const user1 = await prisma.user.create({
    data: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: '$2a$10$FVtM8B8dLQUilVnwMiQykuCYoIdCcPxpvj8xZ0AwKbfcnLVkmLB6.', // Ideally, you should hash the password
      role: 1,
      teamName: 'Admin',
      phoneNumber: "01234567890",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: 'somchai',
      lastname: 'jaidee',
      email: 'somchai',
      password: '$2a$10$FVtM8B8dLQUilVnwMiQykuCYoIdCcPxpvj8xZ0AwKbfcnLVkmLB6.', // Ideally, you should hash the password
      role: 2,
      teamName: 'ทีมช่างแนวใหม่',
      phoneNumber: 1234567890,
    },
  });

  // Seed customer
  const customer1 = await prisma.customer.create({
    data: {
      customerFirstname: 'คุณกลาง',
      customerLasttname: 'มีดี',
      customerLine: 'Customer Line 1',
      customerPhone: "09876543210",
      customerAddress: '123 Main St',
    },
  });

  console.log({ houseDetailName1, houseDetail1, file1, periodName1, period1, project1, user1, customer1 });
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
