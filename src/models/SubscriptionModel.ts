import { Model } from "@tsed/mongoose";
import { Required } from "@tsed/schema";

@Model()
export class SubscriptionModel {
  @Required()
  endpoint: string;
  expirationTime: number;
  @Required()
  keys: {
    p256dh: string;
    auth: string;
  };
}
