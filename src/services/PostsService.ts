import { Inject, Injectable, ProviderType } from "@tsed/di";
import { PostsRepository } from "../repositories/PostsRepository";
import { iPost, iLimits } from "../interfaces";
import { NotificationService } from "./NotificationsService";
@Injectable({
  type: ProviderType.SERVICE
})
export class PostsService {
  @Inject(PostsRepository) private postsRepository: PostsRepository;
  @Inject(NotificationService) private notificationService: NotificationService;

  async findLatestPost() {
    const latestPost = this.postsRepository.findLatest();
    console.log(process.env.MONGODB_URI);
    //make mapping to post here

    return latestPost;
  }

  async findPaginatedPosts(limits: iLimits) {
    const latestPost = this.postsRepository.findPaginated(limits);

    //make mapping to post here

    return latestPost;
  }

  async savePost(post: iPost) {
    const newPost = await this.postsRepository.save(post);
    this.notificationService.sendNotificationToAllSubcribers(newPost.saidBy, newPost.body);
  }
}
