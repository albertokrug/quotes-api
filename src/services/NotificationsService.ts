import { Inject, Injectable, ProviderType } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { iSubscription } from "src/interfaces";
import { SubscriptionModel } from "src/models/SubscriptionModel";
import webPush from "web-push";

@Injectable({
  type: ProviderType.SERVICE
})
export class NotificationService {
  @Inject(SubscriptionModel) private model: MongooseModel<SubscriptionModel>;

  private readonly options = {
    vapidDetails: {
      subject: "mailto:krugalbert@yahoo.de",
      publicKey: "BNoygybxkBctVLSKdoBoz6jSQRhMarxaSW-s3vzGSKW69dI-4bYGwg7PQqRRmpDxFfmQDshmZtp0KJW0vsTdo4Q",
      privateKey: "SXsmjRgUeLDAsJX8-tpHdzRAM-Ngtc0Rj6kXmFbcEr4"
    }
  };

  private readonly welcomeTemplate = {
    title: "Hello to Alberts Quotes",
    description: "You will receive quotes via push notification",
    image: "https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg"
  };

  async sendNotification(subscription: iSubscription, creator = "default", quote = "default") {
    if (creator !== "default") this.welcomeTemplate.title = creator;
    if (quote !== "default") this.welcomeTemplate.description = quote;

    webPush.sendNotification(subscription, JSON.stringify(this.welcomeTemplate), this.options);
  }

  async sendNotificationToAllSubcribers(creator: string, quote: string) {
    const subs = await this.getAllSubscriptions();
    subs.forEach((sub) => {
      this.sendNotification({ ...sub.toClass() }, creator, quote);
    });
  }

  async getAllSubscriptions() {
    const subscriptions = await this.model.find().exec();
    return subscriptions;
  }

  subscribe(subscription: iSubscription) {
    const newSubscription = new this.model(subscription);
    newSubscription.save();
    return newSubscription.toClass();
  }
}
