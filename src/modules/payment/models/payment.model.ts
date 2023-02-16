import { Schema } from '@nestjs/mongoose';

@Schema({ collection: 'payments' })
export class Payment {}
