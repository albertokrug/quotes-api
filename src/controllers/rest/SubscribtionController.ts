import { BodyParams, Controller, Inject, Injectable, Post } from "@tsed/common";
import { NotificationService } from "../../services/NotificationsService";
import { iSubscription } from "../../interfaces";

@Controller("/subscribe")
@Injectable()
export class SubscriptionController {
  @Inject(NotificationService) private notificationService: NotificationService;

  @Post()
  subscribe(@BodyParams() subscription: iSubscription) {
    const newSubscription = this.notificationService.subscribe(subscription);
    this.notificationService.sendNotification({ ...newSubscription });
  }
}
