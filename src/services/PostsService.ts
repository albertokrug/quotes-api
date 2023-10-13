import { Inject, Injectable, ProviderType } from "@tsed/di";
import { PostModel } from "src/models/PostModel";
import { PostsRepository } from "src/repositories/PostsRepository";

@Injectable({
  type: ProviderType.SERVICE
})
export class PostsService {
  @Inject(PostsRepository) private postsRepository: PostsRepository;

  async findLatestPost(): Promise<PostModel> {
    const latestPost = this.postsRepository.findLatest();

    //make mapping to post here

    return latestPost;
  }

  async findPaginatedPosts(limits: any): Promise<PostModel[]> {
    const latestPost = this.postsRepository.findPaginated(limits);

    //make mapping to post here

    return latestPost;
  }
}
