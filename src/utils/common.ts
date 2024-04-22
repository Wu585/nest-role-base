export const getEntities = (path: string) => {
  const map = {
    "/users": "User",
    "/roles": "Role",
    "/menus": "Menu"
  };

  for (let i = 0; i < Object.keys(map).length; i++) {
    const key = Object.keys(map)[i];
    if (path.startsWith(key)) {
      return map[key];
    }
  }
};
