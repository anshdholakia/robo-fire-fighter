import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const endpoint = "http://127.0.0.1:5001/process_audio";
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
