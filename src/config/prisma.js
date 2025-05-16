const { PrismaClient } = require('@prisma/client')

let prisma;

if (!global.prisma) {
    global.prisma = new PrismaClient()
}

prisma = global.prisma;

prisma.$connect()
    .then(() => {
        console.log('Connected to db');
    })
    .catch((err) => {
        console.error('Error connecting to db:', err);
    });


module.exports = prisma;