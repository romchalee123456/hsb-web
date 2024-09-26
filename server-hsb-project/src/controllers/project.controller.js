const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createProject = async (req, res) => {
  const {
    projectCode,
    projectName,
    description,
    amount,
    projectStatusid,
    responseid,
    periodData,
    customerid,
  } = req.body;

  try {
    // Create the project
    const result = await prisma.project.create({
      data: {
        projectCode: projectCode,
        projectName: projectName,
        description: description,
        amount: amount,
        projectStatusid: projectStatusid,
        responseid: responseid,
        customerid: customerid,
      },
    });

    // Handle periodData if it exists
    if (periodData && periodData.length > 0) {
      for (const element of periodData) {
        // Ensure createOn is in ISO-8601 format or set it to null if not provided
        const createOn = element.createOn
          ? new Date(element.createOn).toISOString()
          : null;

        // Create each period associated with the new project
        const resultPeriod = await prisma.period.create({
          data: {
            projectid: result.projectid,
            description: element.description,
            createOn: createOn,
            periodStatusId: element.periodStatusId,
            periodsamount: element.periodsamount ?? 0,
          },
        });
      }
    }

    // Respond with success
    res.status(201).send({
      status: "success",
      data: {
        result: result,
      },
    });
  } catch (err) {
    console.error("Error creating project or periods:", err.message);
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
};

exports.findAllProject = async (req, res) => {
  const data = await prisma.project.findMany();
  if (!data) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: data,
    });
  }
};

exports.updateProjectLocation = async (req, res) => {
  const { locationCode, locationName, lon, lat } = req.body;
  const { id } = req.params;

  const result = await prisma.project.update({
    where: { projectid: Number(id) },
    data: {
      locationCode: locationCode,
      locationName: locationName,
      lon: lon,
      lat: lat,
    },
  });
  if (!result) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: {
        result,
      },
    });
  }
};

exports.updateProjectId = async (req, res) => {
  const {
    projectCode,
    projectName,
    description,
    amount,
    projectStatusid,
    responseid,
    periodData,
    deletePeriod,
    customerid,
  } = req.body;
  const { id } = req.params;

  const result = await prisma.project.update({
    where: { projectid: Number(id) },
    data: {
      projectCode: projectCode,
      projectName: projectName,
      description: description,
      amount: amount,
      projectStatusid: projectStatusid,
      responseid: responseid,
      customerid: customerid,
    },
  });

  if (periodData && periodData.length > 0) {
    for (const element of periodData) {
      if (!element.periodid) {
        // Ensure createOn is in ISO-8601 format or set it to null if not provided
        const createOn = element.createOn
          ? new Date(element.createOn).toISOString()
          : null;

        // Create each period associated with the new project
        const resultPeriod = await prisma.period.create({
          data: {
            projectid: result.projectid,
            description: element.description,
            createOn: createOn,
            periodStatusId: element.periodStatusId,
            periodsamount: element.periodsamount ?? 0,
          },
        });
      } else {
        await prisma.period.update({
          where: { periodid: Number(element.periodid) },
          data: {
            description: element.description,
            periodStatusId: element.periodStatusId,
            periodsamount: element.periodsamount ?? 0,
          },
        });
      }
    }
  }
  if (deletePeriod && deletePeriod.length > 0) {
    for (const element of deletePeriod) {
      if (element.periodid) {
        await prisma.period.delete({
          where: { periodid: Number(element.periodid) },
        });
      }
    }
  }
  if (!result) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: {
        result,
      },
    });
  }
};

exports.findProjectById = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.project.findUnique({
    where: { projectid: Number(id) },
  });

  const periodData = await prisma.period.findMany({
    include: {
      periodStatus: {
        select: {
          periodStatusName: true,
        },
      },
    },
    where: { projectid: Number(id) },
  });

  const countApprovePeriod = await prisma.period.count({
    where: {
      projectid: Number(id),
      periodStatusId: 3,
    },
  });
  console.log(data);
  const customerData = await prisma.customer.findUnique({
    where: { customerid: Number(data.customerid) },
  });

  if (!data) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: data,
      periodData: periodData,
      countApprovePeriod: countApprovePeriod,
      customerData: customerData,
    });
  }
};

exports.deleteProjectId = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.project.delete({
    where: { projectid: Number(id) },
  });
  if (!data) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: data,
    });
  }
};

exports.findAllPeriodDetail = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.periodDetail.findMany({
    where: { periodid: Number(id) },
    include: {
      periodname: true,
    },
  });
  if (!data) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: data,
    });
  }
};
