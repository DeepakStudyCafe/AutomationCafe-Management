import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { startSubscriptionExpiryWorker } from './jobs/subscription-expiry.job';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Start background jobs
  if (process.env.NODE_ENV !== 'test') {
    startSubscriptionExpiryWorker();
  }
});