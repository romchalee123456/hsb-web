const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: '$2a$10$FVtM8B8dLQUilVnwMiQykuCYoIdCcPxpvj8xZ0AwKbfcnLVkmLB6.', // Ideally, you should hash the password
      role: 1,
      teamName: 'Development',
      phoneNumber: '123-456-7890',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'jane.smith@example.com',
      password: '$2a$10$FVtM8B8dLQUilVnwMiQykuCYoIdCcPxpvj8xZ0AwKbfcnLVkmLB6.', // Ideally, you should hash the password
      role: 2,
      teamName: 'Design',
      phoneNumber: '098-765-4321',
    },
  });

  // Seed Projects
  const project1 = await prisma.project.create({
    data: {
      projectName: 'Project Alpha',
      projectCode: 'PA123',
      description: 'First major project.',
      amount: 10000.00,
      userid: user1.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      projectName: 'Project Beta',
      projectCode: 'PB456',
      description: 'Second major project.',
      amount: 20000.00,
      userid: user2.id,
    },
  });

  // Seed Period Statuses
  const periodStatusActive = await prisma.periodStatus.create({
    data: {
        periodStatusName:'ปิด'
    },
  });

  const periodStatusPending = await prisma.periodStatus.create({
    data: {
       periodStatusName:'ดำเนินการ'
    },
  });

  const periodStatusCompleted = await prisma.periodStatus.create({
    data: {
       periodStatusName:'อนุมัติ'
    },
  });

  // Seed Periods
  const period1 = await prisma.period.create({
    data: {
      projectid: project1.projectid,
      description: 'Initial period for Project Alpha',
      periodStatusId: periodStatusActive.periodStatusId,
    },
  });

  const period2 = await prisma.period.create({
    data: {
      projectid: project2.projectid,
      description: 'Initial period for Project Beta',
      periodStatusId: periodStatusCompleted.periodStatusId,
    },
  });

  // Seed Period Names
  const periodName1 = await prisma.periodname.create({
    data: {
      periodName: 'Phase 1',
    },
  });

  const periodName2 = await prisma.periodname.create({
    data: {
      periodName: 'Phase 2',
    },
  });

  // Seed Period Statuses
  const periodDetailStatusStatusActive = await prisma.periodDetailStatus.create({
    data: {
        periodDetailStatusName:'ปิด'
    },
  });

  const  periodDetailStatusStatusPending = await prisma.periodDetailStatus.create({
    data: {
        periodDetailStatusName:'ดำเนินการ'
    },
  });

  const  periodDetailStatusStatusCompleted = await prisma.periodDetailStatus.create({
    data: {
        periodDetailStatusName:'อนุมัติ'
    },
  });
  // Seed Period Details
  const periodDetail1 = await prisma.periodDetail.create({
    data: {
      periodid: period1.periodid,
      projectid: project1.projectid,
      description: 'Detail for Phase 1 of Project Alpha',
      periodDetailStatusId: periodStatusActive.periodStatusId,
      periodnameid: periodName1.periodNameid,
    },
  });

  const periodDetail2 = await prisma.periodDetail.create({
    data: {
      periodid: period2.periodid,
      projectid: project2.projectid,
      description: 'Detail for Phase 2 of Project Beta',
      periodDetailStatusId: periodStatusCompleted.periodStatusId,
      periodnameid: periodName2.periodNameid,
    },
  });

  // Seed House Detail Names
  const houseDetailName1 = await prisma.housedetailname.create({
    data: {
      houseDetailName: 'House Detail Alpha',
    },
  });

  const houseDetailName2 = await prisma.housedetailname.create({
    data: {
      houseDetailName: 'House Detail Beta',
    },
  });

  // Seed House Details
  const houseDetail1 = await prisma.housedetail.create({
    data: {
      houseDetailNameId: houseDetailName1.houseDetailNameid,
      periodDetailid: periodDetail1.periodDetailid,
    },
  });

  const houseDetail2 = await prisma.housedetail.create({
    data: {
      houseDetailNameId: houseDetailName2.houseDetailNameid,
      periodDetailid: periodDetail2.periodDetailid,
    },
  });

  // Seed Files
  await prisma.file.create({
    data: {
      fileName: 'file_alpha.txt',
      filePath: '/path/to/file_alpha.txt',
      statusId: 1,
      houseDetailId: houseDetail1.houseDetailid,
      backUpStatus: 1,
      fileBackupPath: '/backup/path/to/file_alpha.txt',
    },
  });

  await prisma.file.create({
    data: {
      fileName: 'file_beta.txt',
      filePath: '/path/to/file_beta.txt',
      statusId: 1,
      houseDetailId: houseDetail2.houseDetailid,
      backUpStatus: 1,
      fileBackupPath: '/backup/path/to/file_beta.txt',
    },
  });

  // Seed Customers
  await prisma.customer.create({
    data: {
      customerFirstname: 'Alice',
      customerLastname: 'Johnson',
      customerLine: 'Alice Line',
      customerPhone: '111-222-3333',
      customerAddress: '123 Main St, Anytown, USA',
    },
  });

  await prisma.customer.create({
    data: {
      customerFirstname: 'Bob',
      customerLastname: 'Williams',
      customerLine: 'Bob Line',
      customerPhone: '444-555-6666',
      customerAddress: '456 Elm St, Anytown, USA',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
