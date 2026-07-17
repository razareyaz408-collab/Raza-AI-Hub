exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    const HF_API_KEY = process.env.HF_API_KEY;

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Prompt is required"
        })
      };
    }

      const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
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

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");

      return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: `data:image/png;base64,${base64}`
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
