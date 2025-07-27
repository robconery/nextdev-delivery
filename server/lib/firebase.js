import admin from 'firebase-admin';
//import dotenv
import dotenv from 'dotenv'
dotenv.config();

const firebaseConfig = {
  //check to ensure the environment variables are set
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_SECRET_KEY,
    client_email: "firebase-adminsdk-fbsvc@the-next-dev.iam.gserviceaccount.com",
    projectId: "the-next-dev"
  }),
  storageBucket: "the-next-dev.appspot.com",
};

admin.initializeApp(firebaseConfig);

const fb = admin.firestore();

export const storage = admin.storage();
export const db = fb;

export const getDownloadUrl = async function (fileName, duration = 60 * 60 * 1000) {
  //keep window open for 30 minutes
  const expires = new Date(new Date().getTime() + 60 * 30 * 1000).toISOString();

  //console.log("Getting url for ",fileName);
  const url = await storage
    .bucket()
    .file(fileName)
    .getSignedUrl({ action: "read", expires: expires });
  const downloadUrl = url.length > 0 ? url[0] : null;
  if (!downloadUrl) throw new Error("There's no file like that");
  return downloadUrl;
};

export const exists = async function (collection, key, val) {
  let out = null;
  const snap = await fb.collection(collection).where(key, "==", val).get();
  return !snap.empty;
};

export const get = async function (collection, val) {
  let out = null;
  const snap = await fb.collection(collection).doc(val).get();
  if (!snap.empty) {
    out = snap.data();
  }
  return out;
};
export const all = async function (collection) {
  let out = [];
  const snap = await fb.collection(collection).get();
  if (!snap.empty) {
    snap.forEach((doc) => out.push(doc.data()));
  }
  return out;
};

export const find = async function (collection, key, val) {
  let out = [];
  const snap = await fb.collection(collection).where(key, "==", val).get();
  if (!snap.empty) {
    snap.forEach((doc) => out.push(doc.data()));
  }
  return out;
};
export const findOne = async function (collection, key, val) {
  let out = null;
  const snap = await fb.collection(collection).where(key, "==", val).get();
  if (!snap.empty) {
    out = snap.docs[0].data();
  }
  return out;
};

export const updateOne = async function (collection, key, val) {
  await fb.collection(collection).doc(key).set(val, { merge: true });
};

export const create = async function (collection, id, doc) {
  const res = await fb.collection(collection).doc(id).set(doc);
  return res;
};
export const add = async function (collection, doc) {
  const res = await fb.collection(collection).add(doc);
  return res;
};

export const deleteDoc = async function (collection, id) {
  await fb.collection(collection).doc(id).delete();
  return true;
};