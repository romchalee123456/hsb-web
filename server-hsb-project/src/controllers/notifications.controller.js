const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.createNewNotification = async (req, res) => {
    const { description, houseDetailId } = req.body;
    const userId = req.currentUserId;  // Access decodeId here
  try {
    const newNotification = await prisma.notifications.create({
      data: {
        description: description,
        notificationsTypeId: 1,
        createBy: userId,
        actionNotificationsId: 1,
        houseDetailId: houseDetailId,
      },
    });
    const notificationsHistory = await prisma.notificationsHistory.create({
      data: {
        description: description,
        notificationsTypeId: 1,
        createBy: userId,
        actionNotificationsId: 1,
        houseDetailId: houseDetailId,
      },
    });
    const data = await prisma.housedetail.update({
        where: { houseDetailid: Number(houseDetailId) },
        data: {
          houseDetailStatus:2,
    }
    })
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
    const data = await prisma.notifications.findUnique({
      where: { notificationsId: Number(id) },
    });

    await prisma.notificationsHistory.create({
      data: {
        description: description,
        notificationsTypeId: 2,
        createBy: data.createBy,
        actionNotificationsId: 2,
        houseDetailId: data.houseDetailId,
      },
    });
     await prisma.housedetail.update({
      where: { houseDetailid: Number(data.houseDetailId) },
      data: {
        houseDetailStatus:3,
  }
  })
    const remove = await prisma.notifications.delete({
      where: { notificationsId: Number(id) },
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
}

exports.sendBackNotification = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const data = await prisma.notifications.findUnique({
      where: { notificationsId: Number(id) },
    });

    const notificationsHistory = await prisma.notificationsHistory.create({
      data: {
        description: description,
        notificationsTypeId: 3,
        createBy: data.createBy,
        actionNotificationsId: 3,
        houseDetailId: data.houseDetailId,
      },
    });
    await prisma.housedetail.update({
      where: { houseDetailid: Number(data.houseDetailId) },
      data: {
        houseDetailStatus:1,
  }
  })
    const remove = await prisma.notifications.delete({
      where: { notificationsId: Number(id) },
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
}

exports.findAllNotification = async (req, res) => {
  try {
    const data = await prisma.notifications.findMany({
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


