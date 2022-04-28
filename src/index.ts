import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import * as express from "express";
import { Request, Response } from "express";
const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    const userRepository = AppDataSource.manager.getRepository(User);

    const app = express();
    app.use(express.json());
    // app.use(express.urlencoded({ extended: false }));

    // register routes
    app.get("/", async function (req: Request, res: Response) {
      // here we will have logic to return all users
      res.send({ firstName: "Godbless", lastName: "Onoriode" });
    });

    app.get("/users/:id", async function (req: Request, res: Response) {
      // here we will have logic to return user by id
      const user = await userRepository.findOneBy({ id: req.params.id });

      if (user) {
        res.json(user);
      } else {
        res.status(404).send({ msg: "User not found!" });
      }
    });

    app.post("/users", async function (req: Request, res: Response) {
      // here we will have logic to save a user
      const user = await userRepository.save(req.body);
      res.json(user);
    });

    app.put("/users/:id", async function (req: Request, res: Response) {
      // here we will have logic to update a user by a given user id

      const user = await userRepository.findOneBy({ id: req.params.id });

      if (user) {
        user.age = req.body.age;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        await userRepository.save(user);
        const users = await userRepository.find();
        res.json(users);
      } else {
        res.status(403).send("User not found");
      }
    });

    app.delete("/users/:id", async function (req: Request, res: Response) {
      // here we will have logic to delete a user by a given user id
      const user = await userRepository.findOneBy({ id: req.params.id });

      const deletedUser = await userRepository.delete({ id: req.params.id });

      if (deletedUser.affected) {
        res.status(200).send({ msg: "User deleted successfully" });
      } else {
        res.status(404).send({ msg: "User not found!" });
      }
    });

    // create a port number

    const PORT = process.env.PORT || 3000;

    // start express server
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((error) => console.log(error));
