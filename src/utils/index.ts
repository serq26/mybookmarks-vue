import { Timestamp } from "firebase/firestore";

export const firebaseTimestampToDate = (timestamp: Timestamp) => {
  return new Date(timestamp.seconds * 1000);
};