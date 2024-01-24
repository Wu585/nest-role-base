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
        userId: "5c4a6a00-f1f1-4c9e-9c2c-806862a0f898"
      },
      {
        gender: 0,
        photo: "awada",
        address: "yyvcacawy",
        userId: "80ee8375-2f21-4658-a5ab-69294ae7627f"
      },
      {
        gender: 1,
        photo: "waaw",
        address: "fwafw",
        userId: "e86f5fda-427c-4f39-a965-3c3c46797769"
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
        userId: "5c4a6a00-f1f1-4c9e-9c2c-806862a0f898",
        roleId: "d523ae1d-62f7-42c9-87ba-d73e932aa4f4"
      },
      {
        userId: "80ee8375-2f21-4658-a5ab-69294ae7627f",
        roleId: "d523ae1d-62f7-42c9-87ba-d73e932aa4f4"
      },
      {
        userId: "80ee8375-2f21-4658-a5ab-69294ae7627f",
        roleId: "36111f33-2347-4641-9b9f-4fe299c6d7f7"
      },
      {
        userId: "e86f5fda-427c-4f39-a965-3c3c46797769",
        roleId: "64e8e340-5b73-4496-8430-a52e0f2b2dc5"
      }
    ]
  });
};

seed();
