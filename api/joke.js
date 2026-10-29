// api/joke.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch from Yo Mama API
    const response = await fetch(
      "https://api.yomama-jokes.com/v1/jokes/random"
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Return the joke
    return res.status(200).json({
      joke: data.joke || data.setup || "Yo mama so funny, she broke the API.",
      category: data.category || "general"
    });
  } catch (error) {
    console.error("Yo Mama API Error:", error);
    return res.status(500).json({ error: "Failed to fetch joke" });
  }
}
