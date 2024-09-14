import myserver from "./website";

import { security } from "./validators";

const server = new myserver();

security();

server.listen();