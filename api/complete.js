export default async function handler(req, res) {
  try {
    const { paymentId, txid } = req.body || {};
    if (!paymentId || !txid) {
      return res
        .status(400)
        .json({ error: "paymentId and txid required" });
    }

    const apiKey = process.env.PI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing PI_API_KEY" });
    }

    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${apiKey}`,
        },
        body: JSON.stringify({ txid }),
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
