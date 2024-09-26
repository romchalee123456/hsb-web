const { PrismaClient } = require("@prisma/client");
const { decodeTokenForId: decodeTokenForId } = require("../utils/token");

const prisma = new PrismaClient();

exports.findAllProject = async (req, res) => {
  const userId = req.currentUserId; // Access decodeId here

    const projectTotal = await prisma.project.count({
        where: { responseid: Number(userId) },
    });
    const projects = await prisma.project.findMany({
        where: { responseid: Number(userId) },
        include:{
            _count:{
                select:{periods:true}
            }
        }  ,
            orderBy: {
                projectid: 'desc'  // Order by id in descending order
            }
        
        
    });
        if (!projectTotal) {
            res.status(201).send({
                status: "success",
                data: 
                    {
                        projectTotal : 0,
                        projects:[],


                    }
            });
        } else {

            res.status(201).send({
                status: "success",
                data: 
                    {
                        projectTotal : projectTotal,
                        projects:projects,


                    }
                
            });
        }
    
};

exports.findPeriodName = async(req, res) => {

    const periodname = await prisma.periodname.findMany({
        
            orderBy: {
                periodNameid: 'desc'  // Order by id in descending order
            }
        
    });

  if (!periodname) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(201).send({
      status: "success",
      data: {
        periodname,
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
    where: { projectid: Number(id), periodStatusId: 2 },
  });

  const countApprovePeriod = await prisma.period.count({
    where: {
      projectid: Number(id),
      periodStatusId: 3,
    },
  });
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
