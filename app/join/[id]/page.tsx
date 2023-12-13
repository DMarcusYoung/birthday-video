import { doc, getDoc, getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

import firebase_app from '../../firebase';
import Upload from './Upload';
import BackButton from "../../components/BackButton";


interface Params {
    id: string;
}

const UploadPage =  async ({ params } : { params: Params }) => {
    let joinCode = params.id
    let recipientName = '';
    let dateTime = '';
    let emails: string[] = [];
    if (joinCode) {
        const db = getFirestore(firebase_app)
        const docRef = doc(db, 'birthdayboxes', joinCode)
        const docSnap = await getDoc(docRef)
        const data = docSnap.data();
        if (data) {
            recipientName = data.recipientName;
            dateTime = data.dateTime;
            emails = data.emails;
        }
    }

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <BackButton/>
                <h1 className="text-4xl font-bold text-white mb-4">{recipientName}</h1>
                <p className="text-white text-lg mb-4">{dateTime}</p>
                <ul className="text-white text-lg mb-4">
                    {emails.map((email, index) => (
                        <li key={index}>{email}</li>
                    ))}
                </ul>
                <Upload joinCode={joinCode} />
            </main>
        </div>
    );
};

export default UploadPage;
