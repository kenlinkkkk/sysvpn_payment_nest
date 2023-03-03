import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Subscriber, SubscriberDocument } from '../models/subscriber.model';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: Model<SubscriberDocument>,
  ) {}

  async create(payload: any): Promise<Subscriber> {
    return new this.subscriberModel(payload).save();
  }

  async update(id: ObjectId, payload: any): Promise<Subscriber> {
    const subscriber = await this.findById(id);

    Object.assign(subscriber, payload);
    this.subscriberModel.updateOne(id, subscriber);
    return subscriber;
  }

  async findById(id: ObjectId): Promise<Subscriber> {
    return this.subscriberModel.findById(id).exec();
  }

  async findOne(payload: any): Promise<Subscriber> {
    return this.subscriberModel.findOne(payload).exec();
  }
}
