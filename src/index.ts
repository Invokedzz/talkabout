import { myserver } from "./website";

import { validatingthings } from "./validators";

const start = new myserver();

const validation = new validatingthings();

validation.validatestart();

start.listen();