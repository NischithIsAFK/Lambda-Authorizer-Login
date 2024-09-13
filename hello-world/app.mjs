
export const handler = async (event, context) => {
  try {
    console.log("Event received:", event);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
      }),
    };

    return response;
  } catch (err) {
    console.error("Error occurred:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: err.message,
      }),
    };
  }
};
