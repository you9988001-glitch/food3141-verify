export default async function handler(req, res) {
  try {
    const { paymentId } = req.body || {};
    if (!paymentId) {
      return res.status(400).json({ error: "paymentId required" });
    }

    const apiKey = process.env.PI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing PI_API_KEY" });
    }

    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${apiKey}`,
        },
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
