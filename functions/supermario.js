exports.handler = async () => {
  console.log("fn() run");

  const data = {
    name: "mario",
    age: 35,
    job: "plumber",
  };

  // return response to browser
  return {
    statusCode: 200,
    data: JSON.stringify(data),
  };
};
