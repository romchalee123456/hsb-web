const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.createProject = async(req, res) => {
    const { projectCode, projectName, description, amount,projectStatusid,responseid} = req.body;

    const result = await prisma.project.create({
        data: {
          projectCode:projectCode,
          projectName:projectName,
           description: description,
           amount: amount,
           projectStatusid: projectStatusid,
           responseid: responseid,

        },
      })

        if (!result) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                
                    result
                }
            });
        }
    
};

exports.findAllProject = async(req, res) => {

    const data = await prisma.project.findMany();
        if (!data) {
            res.status(500).send({
                status: "error",
                 message: err.message
            });
        } else {

            res.status(201).send({
                status: "success",
                data: 
                    data
                
            });
        }
    
};

exports.updateProjectId = async(req, res) => {
    const { projectCode, projectName, description, amount,projectStatusid,responseid} = req.body;
    const { id } = req.params;

    const result = await prisma.project.update({
        where: { projectid: Number(id) },
        data: {
            projectCode:projectCode,
            projectName:projectName,
             description: description,
             amount: amount,
             projectStatusid: projectStatusid,
             responseid: responseid,

        },
      })

      if (!result) {
                res.status(500).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: "success",
                    data: {
                        result
                    }
                });
            }

};

exports.findProjectById = async(req, res) => {
    const { id } = req.params;

    const data = await prisma.project.findUnique({
        where: { projectid: Number(id) },
    })
    
    if (!data) {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    } else {

        res.status(201).send({
            status: "success",
            data: 
                data
            
        });
    }

};

exports.deleteProjectId = async(req, res) => {
    const { id } = req.params;

    const data = await prisma.project.delete({
        where: { projectid: Number(id) },
    })
    if (!data) {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    } else {

        res.status(201).send({
            status: "success",
            data: 
                data
            
        });
    }
};

