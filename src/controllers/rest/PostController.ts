import { BodyParams, Controller, Get, Inject, Injectable, Post } from "@tsed/common";
//import { MongooseModel } from "@tsed/mongoose";
//import { PostModel } from "src/models/PostModel";
import { PostsService } from "../../services/PostsService";

/* https://tsed.io/docs/controllers.html */

/*interface iPost {
  title: string;
  body: string;
  saidBy: string;
  quotedBy: string;
  createdAt: string;
}*/

interface iLimits {
  skip: number;
  lim: number;
}

@Controller("/posts")
@Injectable()
export class PostController {
  @Inject(PostsService) private postsService: PostsService;
  //@Inject(PostModel) private model: MongooseModel<PostModel>;

  @Post("/paginated")
  async getAll(@BodyParams("limits") limits: iLimits) {
    return this.postsService.findPaginatedPosts(limits);
  }

  @Get("/latest")
  async getLatest() {
    return this.postsService.findLatestPost();
  }

  /* @Post("/generate")
  async generate(@BodyParams("post") post: iPost) {
    const doc = new this.model(post);
    await doc.save();

    return doc;
  }*/
}
