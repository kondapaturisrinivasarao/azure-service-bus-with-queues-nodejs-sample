const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus"); 

// Define connection string and related Service Bus entity names here
const connectionString = "Endpoint=sb://sk4182020.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=irWbMFJ5wl1LFxj10njlJ2zbQgo0/xA8DMNRP3Q8xjY=";
const queueName = "myqueue"; 

async function main(){
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString); 
  const queueClient = sbClient.createQueueClient(queueName);
  const receiver = queueClient.createReceiver(ReceiveMode.receiveAndDelete);
  try {
    const messages = await receiver.receiveMessages(10)
    console.log("Received messages:");
    console.log(messages.map(message => message.body));

    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});