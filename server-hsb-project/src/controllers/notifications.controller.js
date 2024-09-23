const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {sendnotificationsline:sendnotificationsline} = require('../utils/sendnotificationsline')
exports.createNewNotification = async (req, res) => {
    const { description, houseDetailId } = req.body;
    const userId = req.currentUserId;  // Access decodeId here
  try {
    const newNotification = await prisma.notifications.create({
      data: {
        description: description,
        notificationsTypeId: 1,
        createBy: userId,
        approver:1,
        actionNotificationsId: 1,
        houseDetailId: houseDetailId,
      },
    });
    const notificationsHistory = await prisma.notificationsHistory.create({
      data: {
        description: description,
        notificationsTypeId: 1,
        createBy: userId,
        approver:1,
        actionNotificationsId: 1,
        houseDetailId: houseDetailId,
      },
    });
     await prisma.housedetail.update({
        where: { houseDetailid: Number(houseDetailId) },
        data: {
          houseDetailStatus:2,
    }
    })
    const data = await prisma.housedetail.findUnique({
      where: { houseDetailid: Number(houseDetailId) },
      include: {
        houseDetailname: true, // Include housedetailname in the relation
        periodDetail:{
          include: {
            periodname:true,
            period:{
              include: {
                project: true
              }
            }
          }
        }
      },
  })


  const requestData = await prisma.user.findUnique({
    where: { id: Number(userId) },
  })
  
    const approverData = await prisma.user.findUnique({
      where: { id: 1 },
    })

    const message = `
     งานขออนุมัติโดย :${requestData.firstname} ${requestData.lastname}
     รายละเอียด : ${description}
     งาน : ${data.houseDetailname.houseDetailName} งานหลัก :${data.periodDetail.periodname.periodName}
     โครงการ :${data.periodDetail.period.project.projectCode} ${data.periodDetail.period.project.projectName}
     งวด : ${data.periodDetail.period.description}
    `
    sendnotificationsline(approverData.userLineNotificationsid,message);

    if (!newNotification) {
      
      
        res.status(500).send({
            status: "error",
             message: err.message
        });
    } else {
      
        res.status(201).send({
            status: "success",
            data: data
        });
    }
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}
exports.approveNotification = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;


  try {
    // Fetch the notifications data first
    const notificationsdata = await prisma.notifications.findUnique({
      where: { notificationsId: Number(id) },
    });

    // Fetch the house detail data before using it
    const data = await prisma.housedetail.findUnique({
      where: { houseDetailid: Number(notificationsdata.houseDetailId) },
      include: {
        houseDetailname: true, // Include housedetailname in the relation
        periodDetail: {
          include: {
            periodname: true,
            period: {
              include: {
                project: true,
              },
            },
          },
        },
      },
    });

    // Now create the notifications history using the correct data
    const notificationsHistory = await prisma.notificationsHistory.create({
      data: {
        description: notificationsdata.description,
        notificationsTypeId: 2,
        createBy: notificationsdata.createBy,
        approver:1,
        actionNotificationsId: 2,
        houseDetailId: notificationsdata.houseDetailId,
      },
    });

    const requestData = await prisma.user.findUnique({
      where: { id: Number(notificationsdata.createBy) },
    });

    const approverData = await prisma.user.findUnique({
      where: { id: 1 },
    });

    const message = `
    งานอนุมัติโดย: ${approverData.firstname} ${approverData.lastname}
    รายละเอียด: ${description}
    งาน: ${data.houseDetailname.houseDetailName}
    งานหลัก: ${data.periodDetail.periodname.periodName}
    โครงการ: ${data.periodDetail.period.project.projectCode} ${data.periodDetail.period.project.projectName}
    งวด: ${data.periodDetail.period.description}
    `;

    // Assuming sendnotificationsline is a function to send notifications
    sendnotificationsline(requestData.userLineNotificationsid, message);

    await prisma.housedetail.update({
      where: { houseDetailid: Number(notificationsdata.houseDetailId) },
      data: {
        houseDetailStatus: 1,
      },
    });

    const remove = await prisma.notifications.delete({
      where: { notificationsId: Number(id) },
    });

    res.status(201).send({
      status: "success",
      data: notificationsdata,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.sendBackNotification = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    // Fetch the notifications data first
    const notificationsdata = await prisma.notifications.findUnique({
      where: { notificationsId: Number(id) },
    });

    // Fetch the house detail data before using it
    const data = await prisma.housedetail.findUnique({
      where: { houseDetailid: Number(notificationsdata.houseDetailId) },
      include: {
        houseDetailname: true, // Include housedetailname in the relation
        periodDetail: {
          include: {
            periodname: true,
            period: {
              include: {
                project: true,
              },
            },
          },
        },
      },
    });

    // Now create the notifications history using the correct data
    const notificationsHistory = await prisma.notificationsHistory.create({
      data: {
        description: notificationsdata.description,
        notificationsTypeId: 3,
        createBy: notificationsdata.createBy,
        approver:1,
        actionNotificationsId: 3,
        houseDetailId: notificationsdata.houseDetailId,
      },
    });

    const requestData = await prisma.user.findUnique({
      where: { id: Number(notificationsdata.createBy) },
    });

    const approverData = await prisma.user.findUnique({
      where: { id: 1 },
    });

    const message = `
    งานส่งกลับแก้ไชโดย: ${approverData.firstname} ${approverData.lastname}
    รายละเอียด: ${description}
    งาน: ${data.houseDetailname.houseDetailName}
    งานหลัก: ${data.periodDetail.periodname.periodName}
    โครงการ: ${data.periodDetail.period.project.projectCode} ${data.periodDetail.period.project.projectName}
    งวด: ${data.periodDetail.period.description}
    `;

    // Assuming sendnotificationsline is a function to send notifications
    sendnotificationsline(requestData.userLineNotificationsid, message);

    await prisma.housedetail.update({
      where: { houseDetailid: Number(notificationsdata.houseDetailId) },
      data: {
        houseDetailStatus: 1,
      },
    });

    const remove = await prisma.notifications.delete({
      where: { notificationsId: Number(id) },
    });

    res.status(201).send({
      status: "success",
      data: notificationsdata,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};


exports.findAllNotification = async (req, res) => {
  const userId = req.currentUserId;  // Access decodeId here
  try {
    const data = await prisma.notifications.findMany({
      where: { approver: Number(userId) },
      include: {
        actionNotifications: true,
        notificationsType: true,
        housedetail: {
          include: {
            houseDetailname: true, // Include housedetailname in the relation
            periodDetail:{
              include: {
                periodname:true,
                period:{
                  include: {
                    project: true
                  }
                }
              }
            }
          },
        },
      },
    });

    res.status(201).send({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

exports.findNotificationById = async (req, res) => {
 
  const { id } = req.params;
  try {
    const data = await prisma.notifications.findUnique({
      where: { notificationsId: Number(id) },
      include: {
        actionNotifications: true,
        notificationsType: true,
        housedetail: {
          include: {
            houseDetailname: true, // Include housedetailname in the relation
            periodDetail:{
              include: {
                periodname:true,
                period:{
                  include: {
                    project: true
                  }
                }
              }
            }
          },
        },
      },
    });

    const requestData = await prisma.user.findUnique({
      where: { id: Number(data.createBy) },
    })
  
    const approverData = await prisma.user.findUnique({
      where: { id: Number(data.approver) },
    })
    res.status(201).send({
      status: "success",
      data: data,
      requestData:requestData,
      approverData:approverData
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

exports.findAllNotificationHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.notificationsHistory.findMany({
      where: { houseDetailId: Number(id) },
      include: {
        actionNotifications: true,
        notificationsType: true,
   
      },
      orderBy: {
        notificationsHistoryId: 'desc', // Order by 'id' in ascending order, change to 'desc' for descending
      },
    });

    res.status(201).send({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};


