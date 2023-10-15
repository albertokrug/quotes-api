import { BodyParams, Controller, Get, Inject, Injectable, Post } from "@tsed/common";
import { PostsService } from "../../services/PostsService";
import { iPost, iLimits } from "src/interfaces";

@Controller("/posts")
@Injectable()
export class PostController {
  @Inject(PostsService) private postsService: PostsService;

  @Post("/paginated")
  async getAll(@BodyParams("limits") limits: iLimits) {
    return this.postsService.findPaginatedPosts(limits);
  }

  @Get("/latest")
  async getLatest() {
    return this.postsService.findLatestPost();
  }

  @Post("/generate")
  async generate(@BodyParams("post") post: iPost) {
    this.postsService.savePost(post);
  }
}
