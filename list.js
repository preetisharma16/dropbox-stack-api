import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  console.log(event.requestContext.identity.cognitoIdentityId);
  const id = event.requestContext.identity.cognitoIdentityId.trim();
  console.log(event.requestContext.identity.cognitoIdentityId == "admin@admin.com");
  if (id ==="us-east-2:4202831a-ca29-42d7-9eff-739c6f3a9f6e") {
    const params = {TableName: process.env.tableName}; const result = await dynamoDb.scan(params); return result.Items; }
    const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
    };
    const result = await dynamoDb.query(params);
    return result.Items;
  // Return the matching list of items in response body
});
