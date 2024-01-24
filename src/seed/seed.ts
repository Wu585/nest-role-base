import { PrismaService } from "../prisma.service";

const prisma = new PrismaService();

const seed = async () => {
  /*const res = await prisma.user.createMany({
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
  console.log(res);*/
  /*const res = await prisma.profile.createMany({
    data: [
      {
        gender: 1,
        photo: "xxx",
        address: "yyy",
        userId: "0ff6841f-27de-40fd-bf13-20fc147b81fc"
      },
      {
        gender: 0,
        photo: "awada",
        address: "yyvcacawy",
        userId: "3cad2e30-38e5-4232-ac9b-d3f0cbcc3d1a"
      },
      {
        gender: 1,
        photo: "waaw",
        address: "fwafw",
        userId: "7706305a-8d7f-4471-a2ce-de24572cc357"
      }
    ]
  });
  console.log(res);*/
  /*const res = await prisma.role.createMany({
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
  console.log(res);*/

  await prisma.usersWithRoles.createMany({
    data: [
      {
        userId: "0ff6841f-27de-40fd-bf13-20fc147b81fc",
        roleId: "3c6285fd-e8f4-4f65-be6d-18016f797896"
      },
      {
        userId: "3cad2e30-38e5-4232-ac9b-d3f0cbcc3d1a",
        roleId: "3c6285fd-e8f4-4f65-be6d-18016f797896"
      },
      {
        userId: "3cad2e30-38e5-4232-ac9b-d3f0cbcc3d1a",
        roleId: "271e3e04-627f-4075-a97b-65c7cae7bcf1"
      },
      {
        userId: "7706305a-8d7f-4471-a2ce-de24572cc357",
        roleId: "ed8b962b-4ee5-4c39-b4aa-cf4b73b8ae3e"
      }
    ]
  });
};

seed();
