import app from "./app";

const main = () => {
  app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}: http://localhost:4000/`);
};

main();
