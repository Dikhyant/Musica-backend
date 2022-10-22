import { RequestHandler } from "express";
import { db } from "../firebase/Firestore";
import { firestoreNames } from "../firebase/FirestoreNames";
import { Album, Song } from "../utils/Interfaces";

export const albums: RequestHandler = async (request, response) => {
    try{
        const snapshot = await db.collection(firestoreNames.ALBUMS).get();
        const albums: Album[] = new Array<Album>();
        snapshot.forEach( item => {
            const data = item.data();
            albums.push({
                id: item.id,
                name: data.name,
                artistName: data.artistName,
                thumbnailUrl: data.thumbnailUrl,
                runtime: data.runtime,
                isLiked: false
            })
        } )

        response.send(albums);
    } catch(error) {
        console.error(error);
    }

}

export const songs:RequestHandler = async (request, response) => {
    try{
        const collectionId:string = firestoreNames.ALBUMS;
        const docId:string = request.query.albumId as string;

        const data = (await db.collection(collectionId).doc(docId).get()).data() as FirebaseFirestore.DocumentData;
        const songIds: string[] = data.songs;
        const songs: Song[] = Array<Song>();

        let songData;

        for(let i = 0; i < songIds.length; i++) {
            songData = (await db.collection(firestoreNames.SONGS).doc(songIds[i]).get()).data() as FirebaseFirestore.DocumentData;

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
    } catch(error) {
        console.error(error);
    }
}