import { BodyParams, Controller, Inject, Injectable, Post } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { Any } from "@tsed/schema";
import { SubscriptionModel } from "../../models/SubscriptionModel";
import webPush from "web-push";

@Controller("/subscribe")
@Injectable()
export class SubscriptionController {
  @Inject(SubscriptionModel) private model: MongooseModel<SubscriptionModel>;

  @Post()
  subscribe(@BodyParams() @Any() payload: any): any {
    console.log(payload);
    const newSubscription = new this.model(payload);
    newSubscription.save();

    console.log({ ...newSubscription.toClass() });

    const options = {
      vapidDetails: {
        subject: "mailto:krugalbert@yahoo.de",
        publicKey: "BNoygybxkBctVLSKdoBoz6jSQRhMarxaSW-s3vzGSKW69dI-4bYGwg7PQqRRmpDxFfmQDshmZtp0KJW0vsTdo4Q",
        privateKey: "SXsmjRgUeLDAsJX8-tpHdzRAM-Ngtc0Rj6kXmFbcEr4"
      }
    };

    webPush.sendNotification(
      { ...newSubscription.toClass() },
      JSON.stringify({
        title: "Hello to Alberts Quotes",
        description: "this message is coming from the server",
        image: "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg"
      }),
      options
    );
  }
}
