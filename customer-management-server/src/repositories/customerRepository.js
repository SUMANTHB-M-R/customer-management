const prisma = require("../config/database");


async function findAll(page, limit, search = "") {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [customers, totalRecords] = await Promise.all([
    prisma.customer.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    }),
    prisma.customer.count({
      where,
    }),
  ]);

  return {
    customers,
    totalRecords,
  };
}


function findById(id) {
  return prisma.customer.findUnique({
    where: { id },
  });
}

function create(data) {
  return prisma.customer.create({
    data,
  });
}

function update(id, data) {
  return prisma.customer.update({
    where: { id },
    data,
  });
}

function remove(id) {
  return prisma.customer.delete({
    where: { id },
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};