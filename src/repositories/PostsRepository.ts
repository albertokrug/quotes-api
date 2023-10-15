import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { PostModel } from "../models/PostModel";
import { iPost, iLimits } from "../interfaces";

@Injectable()
export class PostsRepository {
  @Inject(PostModel) private model: MongooseModel<PostModel>;

  async save(obj: iPost) {
    const doc = new this.model(obj);
    await doc.save();

    return doc.toClass();
  }

  async findLatest() {
    try {
      const latestObj = await this.model.findOne().sort({ createdAt: -1 }).exec();
      return latestObj;
    } catch (err) {
      console.log(err);
    }
  }

  async findPaginated(limits: iLimits) {
    try {
      const objects = await this.model.find().sort({ createdAt: -1 }).skip(limits.skip).limit(limits.lim).exec();
      return objects;
    } catch (err) {
      console.log(err);
    }
  }
}
