import { PrismaService } from "../prisma.service";

const prisma = new PrismaService();

const seed = async () => {
  const res1 = await prisma.user.createMany({
    data: [
      {
        username: "ricky",
        password: "111"
      },
      {
        username: "tom",
        password: "111"
      },
      {
        username: "jason",
        password: "111"
      }
    ]
  });
  console.log(res1);
  const res2 = await prisma.profile.createMany({
    data: [
      {
        gender: 1,
        photo: "xxx",
        address: "yyy",
        userId: 1
      },
      {
        gender: 0,
        photo: "awada",
        address: "yyvcacawy",
        userId: 2
      },
      {
        gender: 1,
        photo: "waaw",
        address: "fwafw",
        userId: 3
      }
    ]
  });
  console.log(res2);
  const res3 = await prisma.role.createMany({
    data: [
      {
        name: "管理员"
      },
      {
        name: "会员"
      },
      {
        name: "游客"
      }
    ]
  });
  console.log(res3);

  await prisma.usersWithRoles.createMany({
    data: [
      {
        userId: 1,
        roleId: 1
      },
      {
        userId: 1,
        roleId: 2
      },
      {
        userId: 2,
        roleId: 2
      },
      {
        userId: 3,
        roleId: 3
      }
    ]
  });
};

seed();
