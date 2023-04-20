const { db } = require('../../config/firebase')
const { doc, setDoc } = require("firebase/firestore");

const createUserDocument = async (user, name, role) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, { name, role });
  console.log("User document created in Firestore:", user.uid);
};

module.exports = {createUserDocument}