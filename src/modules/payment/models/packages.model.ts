import { Schema } from '@nestjs/mongoose';

@Schema({ collection: 'packages' })
export class Payment {}
