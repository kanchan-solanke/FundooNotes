#!/usr/bin/env node
import { rabbitmqMailSend } from './rabbitmqmailsender';
var amqp = require('amqplib/callback_api');

export const sender = (userData) => {


    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';
            var msg = JSON.stringify(userData);
            console.log(" msg", msg)
            var email = userData.email
            console.log("email", email)
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });

    });
}
sender("Welcome, Kanchan")



const receiver = () => {

    var amqp = require('amqplib/callback_api');

    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function (msg) {
                console.log(" [x] Received %s", msg.content.toString());
                var json = JSON.parse(msg.content.toString())
                rabbitmqMailSend(json)
            }, {
                noAck: true
            });
        });
    });
}
receiver()