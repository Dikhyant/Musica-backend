"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songs = exports.albums = void 0;
const Firestore_1 = require("../firebase/Firestore");
const FirestoreNames_1 = require("../firebase/FirestoreNames");
const albums = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield Firestore_1.db.collection(FirestoreNames_1.firestoreNames.ALBUMS).get();
        const albums = new Array();
        snapshot.forEach(item => {
            const data = item.data();
            albums.push({
                id: item.id,
                name: data.name,
                artistName: data.artistName,
                thumbnailUrl: data.thumbnailUrl,
                runtime: data.runtime,
                isLiked: false
            });
        });
        response.send(albums);
    }
    catch (error) {
        console.error(error);
    }
});
exports.albums = albums;
const songs = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = FirestoreNames_1.firestoreNames.ALBUMS;
        const docId = request.query.albumId;
        const data = (yield Firestore_1.db.collection(collectionId).doc(docId).get()).data();
        const songIds = data.songs;
        const songs = Array();
        let songData;
        for (let i = 0; i < songIds.length; i++) {
            songData = (yield Firestore_1.db.collection(FirestoreNames_1.firestoreNames.SONGS).doc(songIds[i]).get()).data();
            songs.push({
                id: songIds[i],
                artistName: songData.artistName,
                name: songData.name,
                thumbnailUrl: songData.thumbnailUrl,
                runtime: songData.runtime,
                isLiked: false
            });
        }
        response.send(songs);
    }
    catch (error) {
        console.error(error);
    }
});
exports.songs = songs;
