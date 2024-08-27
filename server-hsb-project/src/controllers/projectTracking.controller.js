const { PrismaClient } = require('@prisma/client')
const {decodeTokenForId:decodeTokenForId} = require('../utils/token')

const prisma = new PrismaClient()


exports.findAllProject = async(req, res) => {

    const authHeader = req.headers['authorization'];
  
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('UnAuthorization')
    } 
   var decode =  decodeTokenForId(token)

    const projectTotal = await prisma.project.count({
        where: { responseid: Number(decode.id) },
    });
    const projects = await prisma.project.findMany({
        where: { responseid: Number(decode.id) },
        include:{
            _count:{
                select:{periods:true}
            }
        }
        
    });
        if (!projectTotal) {
            res.status(500).send({
                status: "error",
                 message: err.message
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



