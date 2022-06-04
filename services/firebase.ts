import { initializeApp } from 'firebase/app'
import { getFirestore, getDoc, getDocs, setDoc, addDoc, updateDoc, doc, onSnapshot, query, where, orderBy, limit, collection } from 'firebase/firestore'
import { getAuth, signInAnonymously as signInAnon, onAuthStateChanged as authStateChanged, signOut as logOut, Unsubscribe, NextOrObserver, User } from 'firebase/auth'
import { getStorage, uploadBytes, getBlob, ref, getDownloadURL } from 'firebase/storage'

const config = {
    apiKey: "AIzaSyDMEA8cJbdvAAlqVGEEPLX34G4MOZ_FzSc",
    authDomain: "portfolio-dcc1b.firebaseapp.com",
    projectId: "portfolio-dcc1b",
    storageBucket: "portfolio-dcc1b.appspot.com",
    messagingSenderId: "984421017349",
    appId: "1:984421017349:web:fd39f83d27b2c48f25396c",
    measurementId: "G-FE6K4209F6",
};

// Initialisation of services
const app = initializeApp(config)
const firestore = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

// Auth utility functions
export async function signInAnonymously() {
    await signInAnon(auth)
}

export function onAuthStateChanged(nextOrObserver: NextOrObserver<User>): Unsubscribe {
    return authStateChanged(auth, nextOrObserver)
}

export async function signOut() {
    await logOut(auth)
}

// Firestore utility functions
export async function getDocumentData(collectionID: string, docID: string) {
    const document = await getDoc(doc(firestore, collectionID, docID))
    return document.data()
}

export async function addDocument(collectionID: string, data: {}) {
    return await addDoc(collection(firestore, collectionID), data)
}

export async function setDocument(collectionID: string, docID: string, data: {}) {
    await setDoc(doc(firestore, collectionID, docID), data)
}

export function updateDocument(collectionID: string, docID: string, data: {}) {
    updateDoc(doc(firestore, collectionID, docID), data)
}

export function onDocumentChanged(collectionID: string, docID: string, callbackFn: (data: any) => void) {
    return onSnapshot(doc(firestore, collectionID, docID), doc => callbackFn(doc.data()) )
}

export function onCollectionChanged(collectionID: string, callbackFn: (dataArray: any[]) => void) {
    return onSnapshot(collection(firestore, collectionID), col => callbackFn(col.docs.map( doc => doc.data() )) )
}

export async function getSnakeHighScores() {
    const q = query(collection(firestore, 'users'), orderBy('snakeHighScore', 'desc'), limit(10))
    const docs = await getDocs(q)
    return docs.docs.map( doc => doc.data() )
}

// Storage utility functions
export async function getFileURL(fileref: string) {
    return await getDownloadURL(ref(storage, fileref))
}