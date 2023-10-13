import { Inject, Injectable, ProviderType } from "@tsed/di";
import { PostsRepository } from "../repositories/PostsRepository";

interface iLimits {
  skip: number;
  lim: number;
}

@Injectable({
  type: ProviderType.SERVICE
})
export class PostsService {
  @Inject(PostsRepository) private postsRepository: PostsRepository;

  async findLatestPost() {
    const latestPost = this.postsRepository.findLatest();

    //make mapping to post here

    return latestPost;
  }

  async findPaginatedPosts(limits: iLimits) {
    const latestPost = this.postsRepository.findPaginated(limits);

    //make mapping to post here

    return latestPost;
  }
}
