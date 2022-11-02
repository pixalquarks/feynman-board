import mongoose, {Types} from "mongoose";

export interface IBlock {
  understanding: number;
  text: string;
  delimiter: string;
}

export interface ITopic {
  _id: Types.ObjectId;
  name: string;
  blocks: IBlock[];
}

interface IUser {
  _id: Types.ObjectId;
  name: string;
  topics: ITopic[];
}

const blockSchema = new mongoose.Schema<IBlock>({
    understanding: { type: Number, required: true },
    text: { type: String, required: true },
    delimiter: { type: String, required: true },
})

const topicSchema = new mongoose.Schema<ITopic>({
  name: { type: String, required: true },
  blocks: { type: [blockSchema], required: true }
});

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  topics: { type: [topicSchema] }
});

export const User = mongoose.model<IUser>("User", userSchema);

mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/feynman-board", () => {
  console.log("Connected to database");
});

mongoose.Promise = Promise;

export default mongoose;