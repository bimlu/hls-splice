const HLSSpliceVod = require("./index")


const hlsVod = new HLSSpliceVod(
    'https://maitv-vod.lab.eyevinn.technology/stswe17-ozer.mp4/master.m3u8'
);

hlsVod.load()
    .then(() => {
        return hlsVod.insertAdAt(
            35000,
            'https://maitv-vod.lab.eyevinn.technology/ads/apotea-15s.mp4/master.m3u8'
        );
    })
    .then(() => {
        const mediaManifest = hlsVod.getMediaManifest(4928000);
        console.log(mediaManifest);
    })