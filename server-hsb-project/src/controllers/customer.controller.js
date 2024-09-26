const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createCustomer = async (req, res) => {
  const {
    customerFirstname,
    customerLastname,
    customerLine,
    customerPhone,
    customerAddress,
  } = req.body;

  const result = await prisma.customer.create({
    data: {
      customerFirstname: customerFirstname,
      customerLastname: customerLastname,
      customerLine: customerLine,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
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

exports.findAllCustomer = async (req, res) => {
  const data = await prisma.customer.findMany();
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

exports.updateCustomerId = async (req, res) => {
  const {
    customerFirstname,
    customerLastname,
    customerLine,
    customerPhone,
    customerAddress,
  } = req.body;
  const { id } = req.params;

  const result = await prisma.customer.update({
    where: { customerid: Number(id) },
    data: {
      customerFirstname: customerFirstname,
      customerLastname: customerLastname,
      customerLine: customerLine,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
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

exports.findCustomerById = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.customer.findUnique({
    where: { customerid: Number(id) },
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

exports.deleteCustomerId = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.customer.delete({
    where: { customerid: Number(id) },
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
