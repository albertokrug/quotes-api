import { Model } from "@tsed/mongoose";
import { Default, Format, Required } from "@tsed/schema";

@Model()
export class PostModel {
  @Required()
  title: string;

  @Required()
  body: string;

  @Default("Admin")
  quotedBy: string;

  @Required()
  saidBy: string;

  @Default(Date.now)
  @Format("date")
  createdAt: Date = new Date();
}
