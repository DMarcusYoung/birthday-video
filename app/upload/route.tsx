const { Storage } = require('@google-cloud/storage');
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export async function POST(req: NextRequest) {
    const storage = new Storage({
        projectId: 'senior-project-birthday-video',
    });
    const bucket = storage.bucket('birthday-videos');

    const data = await req.formData();
    const video = data.get('video');

    if (!video) {
        return NextResponse.json({ success: false, error: 'No video'});
    }
    if (typeof video === "object" && "arrayBuffer" in video) {
        const buffer = Buffer.from(await video.arrayBuffer());
        const fpath = `public/${video.name}`;
        await fs.writeFileSync(fpath, buffer);

        const res = await bucket.upload(fpath, {destination: video.name});

        // console.log(res)

        fs.unlinkSync(fpath);
    }

    return NextResponse.json({ success: true });
}

