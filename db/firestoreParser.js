const admin = require('firebase-admin');
const Firestore = admin.firestore();

const firestoreServerTimestamp = Firestore.FieldValue.serverTimestamp();

const parser = {
	read(doc) {
		return JSON.parse(doc.session);
	},

	save(doc) {
		return {
			session: JSON.stringify(doc),
			dateModified: firestoreServerTimestamp,
		};
	},
};

module.exports = parser;