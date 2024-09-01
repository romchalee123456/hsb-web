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


