import { NextRequest, NextResponse } from 'next/server'
import { DocumentSnapshot, collection, getDocs, getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
const {Storage} = require('@google-cloud/storage');
const {TranscoderServiceClient} = require('@google-cloud/video-transcoder').v1;

import firebase_app from '../firebase';
import { send } from 'process';

export async function GET(req: NextRequest) {
    const currTime = new Date()
    currTime.setSeconds(0,0)
    const db = getFirestore(firebase_app)
    const querySnapshot = await getDocs(collection(db, "birthdayboxes"));
    querySnapshot.forEach((doc) => {
        let sendTime = new Date(doc.data().dateTime)
        // if(currTime.getTime() === sendTime.getTime()){
        if(doc.data().joinCode === "44513013"){
            console.log("compile and send video")
            combine_videos(doc)
            // send_video(doc)
            // concatenate_videos(doc)
            // listJobs()
            // getJob('cd9ac113-0571-4627-bd3a-078415e9e282')
        }
        // Send joincode_birthday_video.mp4
    });

    return NextResponse.json({ success: true });
}

async function combine_videos(doc: DocumentSnapshot){
    const storage = new Storage();
    const bucket = storage.bucket('birthday-videos');
    // const sources = doc.data()!.videos
    const sources = ['14089.MP4', '14117.MP4']
    sources.forEach(async (source) => {
      const [metadata] = await bucket.file(source).getMetadata();
      console.log(`Video: ${source}, Format: ${metadata.contentType}`);
  });
    // const combineOptions = {
    //     ifGenerationMatch: 0,
    //   };
    // const res = await bucket.combine(sources, `${doc.data()!.joinCode}_birthday_video.mp4`);
    // console.log(res)
}

async function send_video(doc: DocumentSnapshot){
    // Send joincode_birthday_video.mp4
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: doc.data()!.recipientEmail,
      from: 'marcus.young@yale.edu',
      subject: 'Happy Birthday!',
      text: 'text section',
      html: `<p>Happy Birthday! Here's a birthday video from your loved ones!</p>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
}

const transcoderServiceClient = new TranscoderServiceClient();

async function listJobs() {
  const iterable = await transcoderServiceClient.listJobsAsync({
    parent: transcoderServiceClient.locationPath('senior-project-birthday-video', 'us-central1'),
  });
  console.info('Jobs:');
  for await (const response of iterable) {
    console.log(response.name);
  }
}

async function getJob(jobId: string) {
    // Construct request
    const request = {
      name: transcoderServiceClient.jobPath('senior-project-birthday-video', 'us-central1', jobId),
    };
    const [response] = await transcoderServiceClient.getJob(request);
    console.log(`Job: ${response}`);
}

async function concatenate_videos(doc: DocumentSnapshot){
    const request = {
    parent: transcoderServiceClient.locationPath('senior-project-birthday-video', 'us-central1'),
    job: {
        outputUri: 'gs://birthday-videos/', // maybe specify file name
        config: {
            inputs: [
                {
                    key: 'input1',
                    uri: 'gs://birthday-videos/14089.MP4'
                },
                {
                    key: 'input2',
                    uri: 'gs://birthday-videos/14117.MP4'
                }
            ],
            editList: [
              {
                key: 'atom1',
                inputs: [
                  'input1',
                ],
              },
              {
                key: 'atom2',
                inputs: [
                  'input2',
                ],
              },
            ],
            elementaryStreams: [
                {
                  key: 'video-stream0',
                  videoStream: {
                    h264: {
                      heightPixels: 360,
                      widthPixels: 640,
                      bitrateBps: 550000,
                      frameRate: 60,
                    },
                  },
                },
                {
                  key: 'audio-stream0',
                  audioStream: {
                    codec: 'aac',
                    bitrateBps: 64000,
                  },
                },
              ],
              muxStreams: [
                {
                  key: 'sd',
                  container: 'mp4',
                  elementaryStreams: ['video-stream0', 'audio-stream0'],
                },
              ],
        }
    }
    }
    const [response] = await transcoderServiceClient.createJob(request)
    console.log(`Job: ${response}`);
}