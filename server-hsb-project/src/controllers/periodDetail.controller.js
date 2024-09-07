const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.createPeriodDetail = async (req, res) => {
    const { description, projectid } = req.body;
    
    const result = await prisma.periodDetail.create({
        data: {
            description: description,
            projectid: projectid
        },
    });

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

exports.updatePeriodDetailId = async (req, res) => {
        const { description } = req.body;
        const { id } = req.params;

        const result = await prisma.periodDetail.update({
            where: { periodDetailid: Number(id) }, 
            data: {
                description: description,
            },
        });

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

exports.findPeriodDetailById = async(req, res) => {
    const { id } = req.params;

    const data = await prisma.periodDetail.findUnique({
        where: { periodDetailid: Number(id) },
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

exports.deletePeriodDetailId = async(req, res) => {
    const { id } = req.params;

    const data = await prisma.periodDetail.delete({
        where: { periodDetailid: Number(id) },
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

exports.findAllPeriodName = async(req, res) => {

    const data = await prisma.periodname.findMany();

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

