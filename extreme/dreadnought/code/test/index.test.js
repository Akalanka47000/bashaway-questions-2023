const crypto = require('crypto');
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: crypto.randomBytes(16).toString('hex'),
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: crypto.randomUUID() });

test('should check if messages are being published to the topic SOS every second', async () => {
  let messageCount = 0;
  await consumer.connect();
  await consumer.subscribe({ topic: 'SOS' });
  await new Promise((resolve) => {
    consumer.run({
      eachMessage: async ({ message }) => {
        messageCount++;
        expect(message.value.toString()).toBeTruthy();
        if (messageCount === 5) {
          resolve();
        }
      }
    });
  });
})