import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as AWS from 'aws-sdk';
import { InputLogEvent } from 'aws-sdk/clients/cloudwatchlogs';

@Injectable()
export class LoggingService implements NestLoggerService {
    private cloudwatchLogs: AWS.CloudWatchLogs;

    constructor(private readonly logger: Logger) {
        this.configureAwsSdk();
    }

    private configureAwsSdk() {
        // cloudwatch logic
    }

    private createLogEvent(message: string, timestamp: number): InputLogEvent {
        const logData = { message, timestamp };
        console.log('<<<logData', logData);

        return {
            message: JSON.stringify(logData),
            timestamp: timestamp,
        };
    }

    // Log method for general events
    async log(message: string, type: string, subtype: string): Promise<void> {
        try {
            const logEvent = this.createLogEvent(message, new Date().getTime());
            // implementation of the log method to send log messages to CloudWatch Logs
        } catch (error) {
            console.error('Error sending log message:', error);
            throw new Error('Failed to send log message');
        }
    }

    // Error and Warn methods can use the 'log' method with appropriate event type and subtype
    async error(message: string): Promise<void> {
        await this.log(
            message,
            'error', // Event type
            'custom', // Event subtype
        );
    }

    async warn(message: string): Promise<void> {
        await this.log(
            message,
            'warning', // Event type
            'custom', // Event subtype
        );
    }
}
