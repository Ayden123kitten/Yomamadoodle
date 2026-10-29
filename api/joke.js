export default async function handler(req, res) {
  // Set CORS headers to allow your frontend to fetch this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch from the actual Yo Mama API endpoint
    const response = await fetch('https://api.yomama-jokes.com/v1/jokes/random'); // Replace with actual SDK endpoint if different
    
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    
    // Return the joke to your frontend
    return res.status(200).json(data);
  } catch (error) {
    console.error('Yo Mama API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch joke' });
  }
}