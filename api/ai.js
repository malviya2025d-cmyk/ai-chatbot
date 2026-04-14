export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Only POST allowed");
  }

  return res.status(200).json({
    result: "API working ✅"
  });
}
