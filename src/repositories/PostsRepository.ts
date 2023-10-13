import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { PostModel } from "src/models/PostModel";

interface iLimits {
  skip: number;
  lim: number;
}
@Injectable()
export class PostsRepository {
  @Inject(PostModel) private model: MongooseModel<PostModel>;

  async save(obj: PostModel): Promise<PostModel> {
    const doc = new this.model(obj);
    await doc.save();

    return doc;
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
