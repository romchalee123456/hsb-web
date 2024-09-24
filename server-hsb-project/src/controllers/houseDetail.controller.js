const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



exports.findAllHouseDetail = async(req, res) => {

    const { id } = req.params;

    const data = await prisma.housedetail.findMany({
        where: { periodDetailid: Number(id) },
        include: {
          houseDetailname: true,
        },
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


exports.findHouseDetailById = async(req, res) => {

    const { id } = req.params;

    const data = await prisma.housedetail.findUnique({
        where: { houseDetailid: Number(id) },
        include: {
          houseDetailname: true,
        },
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

exports.findAllFileByHouseDetail = async(req, res) => {

    const { id } = req.params;

    const data = await prisma.file.findMany({
        where: { houseDetailId: Number(id) },
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

exports.deleteFileByID = async(req, res) => {

    const { id } = req.params;

    const data = await prisma.file.delete({
        where: { fileid: Number(id) },
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

exports.createHouseDetail = async (req, res) => {
    const {houseDetailNameId, periodDetailid} = req.body;
    
    const result = await prisma.housedetail.create({
        data: {
            houseDetailNameId: houseDetailNameId,
            periodDetailid: periodDetailid,
            houseDetailStatus: 1,
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

exports.updateHouseDetailId = async (req, res) => {
        const {houseDetailNameId, periodDetailid} = req.body;
        const { id } = req.params;

        const result = await prisma.housedetail.update({
            where: { houseDetailid: Number(id) }, 
            data: {
                houseDetailNameId: houseDetailNameId,
                periodDetailid: periodDetailid,
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

exports.findAllHoseDetailName = async(req, res) => {

    const data = await prisma.housedetailname.findMany();

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

exports.deleteHouseDetailId = async(req, res) => {
    const { id } = req.params;

    const data = await prisma.housedetail.delete({
        where: { houseDetailid: Number(id) },
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

