const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
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
  // Seed users
  const user1 = await prisma.user.create({
    data: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 1,
      phoneNumber: '123-456-7890',
      teamName: 'Team Alpha',
    }
  });

  const customer1 = await prisma.customer.create({
    data: {
      customerFirstname: 'Alice',
      customerLastname: 'Smith',
      customerLine: 'LINE_ID_001',
      customerPhone: '555-555-5555',
      customerAddress: '123 Main St'
    }
  });

  // Seed a project
  const project1 = await prisma.project.create({
    data: {
      projectName: 'Project X',
      projectCode: 'PX123',
      description: 'A sample project',
      amount: 50000.00,
      locationName: 'Location A',
      locationCode: 'LOC001',
      lat: 13.756331,
      lon: 100.501762,
      userid: user1.id
    }
  });

  // Seed period
  const period1 = await prisma.period.create({
    data: {
      projectid: project1.projectid,
      description: 'Initial Period',
      periodStatusId: 1
    }
  });

  // Seed period detail
  const periodDetail1 = await prisma.periodDetail.create({
    data: {
      periodid: period1.periodid,
      projectid: project1.projectid,
      description: 'Period detail description',
      periodDetailStatusId: 1,
      periodname: {
        create: {
          periodName: 'Period Name 1'
        }
      }
    }
  });

  // Seed house details
  const houseDetail1 = await prisma.housedetail.create({
    data: {
      houseDetailNameId: 1,
      periodDetailid: periodDetail1.periodDetailid,
      houseDetailStatus: 1,
      houseDetailname: {
        create: {
          houseDetailName: 'House Name 1'
        }
      },
      periodDetail: {
        connect: { periodDetailid: periodDetail1.periodDetailid }
      }
    }
  });

  // Seed notifications
  const notificationType1 = await prisma.notificationsType.create({
    data: {
      notificationsTypeName: 'New Notification',
    },
  });

  const notification1 = await prisma.notifications.create({
    data: {
      description: 'Sample Notification',
      notificationsTypeId: notificationType1.notificationsTypeId,
      createBy: user1.id,
      approver: user1.id,
      houseDetailId: houseDetail1.houseDetailid,
      actionNotifications: {
        create: {
          actionNotificationsName: 'Action 1',
        }
      }
    }
  });

  // Seed files
  const file1 = await prisma.file.create({
    data: {
      fileName: 'file1.txt',
      filePath: '/files/file1.txt',
      statusId: 1,
      houseDetailId: houseDetail1.houseDetailid,
      backUpStatus: 0,
      fileBackupPath: '/backup/file1.txt',
      reportSelected: false,
    }
  });

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
