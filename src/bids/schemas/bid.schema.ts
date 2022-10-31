import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BidDocument = Bid & Document;

@Schema()
export class Bid {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: number;

  @Prop({ type: Types.ObjectId, required: true })
  petId: string;

  @Prop({ type: Types.ObjectId, required: true })
  userId: string;
}

var BidSchema = SchemaFactory.createForClass(Bid);
BidSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.petId;
  delete obj.userId;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export { BidSchema };
