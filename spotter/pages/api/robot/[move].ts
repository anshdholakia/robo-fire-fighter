// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let { move } = req.query;
  // check that move is w, a, s, d, q, e:
  // if not, return 400
  // if so, return 200
  if (!move) {
    return res.status(400).json({ error: "no move provided" });
  }
  move = move.toString().toLowerCase();
  const valid = ["w", "a", "s", "d", "q", "e", "r", "f"];
  // w: forward
  // a: left
  // s: back
  // d: right
  // q: turn left
  // e: turn right
  // r: sit
  // f: stand
  if (!valid.includes(move)) {
    return res.status(400).json({ error: "invalid move" });
  }
  let robotApi = "http://127.0.0.1:5000/";
  switch (move) {
    case "w":
      robotApi += "move/forward";
      break;
    case "a":
      robotApi += "move/left";
      break;
    case "s":
      robotApi += "move/backward";
      break;
    case "d":
      robotApi += "move/right";
      break;
    case "q":
      robotApi += "turn/left";
      break;
    case "e":
      robotApi += "turn/right";
      break;
    case "r":
      robotApi += "sit";
      break;
    case "f":
      robotApi += "stand";
      break;
    default:
      break;
  }
  try {
    const robotRes = await fetch(robotApi);
    const data = await robotRes.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "disconnected" });
  }
}
