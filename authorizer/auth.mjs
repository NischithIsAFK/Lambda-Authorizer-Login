import jwt from "jsonwebtoken";

const JWT_SECRET = "hello@world@dynamodb";

export const handler = async (event) => {
  try {
    const token = event.authorizationToken;

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    return {
      principalId: "user",
      policyDocument: generatePolicyDocument("Allow", event.methodArn),
    };
  } catch (err) {
    console.error("Token verification failed:", err);
    return {
      principalId: "user",
      policyDocument: generatePolicyDocument("Deny", event.methodArn),
      "context": {
      "stringKey": "Login Expired. Login again please",
    },
    };
  }
};

// Reusable function to generate the policy document
function generatePolicyDocument(effect, methodArn) {
  if (!effect || !methodArn) return null;

  return {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: methodArn,
      },
    ],
  };
}
