export interface iLimits {
  skip: number;
  lim: number;
}

export interface iPost {
  title: string;
  body: string;
  saidBy: string;
  quotedBy: string;
  createdAt: string;
}

export interface iSubscription {
  endpoint: string;
  expirationTime: number;
  keys: {
    p256dh: string;
    auth: string;
  };
}
