import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PetDocument = Pet & Document;

enum PetStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  SOLD = 'sold',
}

@Schema()
export class Pet {
  @Prop({ required: true })
  name: string;

  @Prop({ default: PetStatus.AVAILABLE, required: true })
  status: PetStatus;

  @Prop({ type: Types.ObjectId, required: true })
  ownerId: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
