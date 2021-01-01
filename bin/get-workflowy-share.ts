import f from "../lib/workflowy-fetch";

f(process.argv[2]).then((r) => console.log(JSON.stringify(r, null, 2)));
