// netlify/functions/helloWorld.js
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({message: "Hello World"})
  };
};
//# sourceMappingURL=helloWorld.js.map
