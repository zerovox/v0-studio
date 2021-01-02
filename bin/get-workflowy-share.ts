import f from "../lib/workflowyFetch";

f(process.argv[2]).then((r) => console.log(JSON.stringify(r, null, 2)));
