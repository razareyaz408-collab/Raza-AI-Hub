exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: "Method not allowed"
        })
      };
    }

    const { prompt } = JSON.parse(event.body || "{}");

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Prompt is required"
        })
      };
    }

    const HF_API_KEY = process.env.HF_API_KEY;

    if (!HF_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "HF_API_KEY not found in Netlify Environment Variables"
        })
      };
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error
        })
      };
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: `data:image/png;base64,${imageBuffer.toString("base64")}`
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
};
