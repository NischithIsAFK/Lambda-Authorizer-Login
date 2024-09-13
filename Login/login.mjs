import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });
import jwt from "jsonwebtoken";
const JWT_SECRET = "hello@world@dynamodb";

const sendResponse = (status, body) => {
  return {
    statusCode: status,
    body: JSON.stringify(body),
  };
};

export const handler = async (event) => {
  try {
    console.log("Received event: ", event);

    // Parse the body of the event
    const eventBody = JSON.parse(event.body);
    const { email, password } = eventBody;

    // DynamoDB parameters
    const params = {
      TableName: "ng-user-table",
      Key: {
        email: { S: email },
      },
    };

    // Fetching the user from DynamoDB
    const command = new GetItemCommand(params);
    const data = await client.send(command);

    // Checking if the user was found
    if (!data.Item) {
      return sendResponse(404, { message: "User not found" });
    }

    // Verifying the password
    if (data.Item.password.S === password) {
      // Sign a JWT token for the user
      const token = jwt.sign({ email: data.Item.email.S }, JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("JWT token generated: ", token);

      return sendResponse(200, { message: "Login Successful", token });
    } else {
      return sendResponse(401, { message: "Password incorrect" });
    }
  } catch (err) {
    // Logging the error for debugging purposes
    console.error("Error: ", err);
    return sendResponse(500, { message: "Internal Server Error", error: err });
  }
};
