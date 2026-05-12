// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client";

// const connectionString = import.meta.env.DATABASE_URL;
// const adapter = new PrismaPg({ connectionString });
// // const prismaAdapter = new PrismaClient({ adapter });

// // export default prisma;

// const globalForPrisma = globalThis as unknown as {
//   prisma?: PrismaClient;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// if (import.meta.env.MODE !== "production") globalForPrisma.prisma = prisma;

import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const connectionString = import.meta.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as {
  prisma?: InstanceType<typeof PrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (import.meta.env.MODE !== "production") {
  globalForPrisma.prisma = prisma;
}

// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma?: PrismaClient;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (import.meta.env.MODE !== "production") globalForPrisma.prisma = prisma;
