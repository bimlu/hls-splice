[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Coverage Status](https://coveralls.io/repos/github/Eyevinn/hls-splice/badge.svg?branch=master)](https://coveralls.io/github/Eyevinn/hls-splice?branch=master) [![Slack](http://slack.streamingtech.se/badge.svg)](http://slack.streamingtech.se)

A Node library to insert segments from an HLS VOD (e.g. ad) into another HLS VOD.

## Installation

```
npm install --save @eyevinn/hls-splice
```

## Usage

The code below shows an example of how an ad (HLS VOD) is inserted 35 seconds from the start in an HLS VOD.

```js
const hlsVod = new HLSSpliceVod('https://maitv-vod.lab.eyevinn.technology/stswe17-ozer.mp4/master.m3u8');
hlsVod.load()
.then(() => {
  return hlsVod.insertAdAt(35000, 'https://maitv-vod.lab.eyevinn.technology/ads/apotea-15s.mp4/master.m3u8');
})
.then(() => {
  const mediaManifest = hlsVod.getMediaManifest(4928000);
  console.log(mediaManifest);
})
```

This example below illustrates what this library does. Consider this HLS VOD:

```
#EXTM3U
#EXT-X-TARGETDURATION:9
#EXT-X-ALLOW-CACHE:YES
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:1
#EXTINF:9.000,
segment1_0_av.ts
#EXTINF:9.000,
segment2_0_av.ts
#EXTINF:9.000,
segment3_0_av.ts
#EXTINF:9.000,
segment4_0_av.ts
#EXTINF:9.000,
segment5_0_av.ts
#EXTINF:9.000,
segment6_0_av.ts
#EXTINF:9.000,
segment7_0_av.ts
#EXTINF:9.000,
segment8_0_av.ts
#EXTINF:9.000,
segment9_0_av.ts
#EXTINF:6.266,
segment10_0_av.ts
#EXT-X-ENDLIST
```

and with this library we can insert this HLS VOD (ad):

```
#EXTM3U
#EXT-X-TARGETDURATION:3
#EXT-X-ALLOW-CACHE:YES
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:1
#EXTINF:3.000,
ad1_0_av.ts
#EXTINF:3.000,
ad2_0_av.ts
#EXTINF:3.000,
ad3_0_av.ts
#EXTINF:3.000,
ad4_0_av.ts
#EXTINF:3.000,
ad5_0_av.ts
#EXT-X-ENDLIST
```

and get this result:

```
#EXTM3U
#EXT-X-TARGETDURATION:9
#EXT-X-ALLOW-CACHE:YES
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:1
#EXTINF:9.0000,
segment1_0_av.ts
#EXT-X-DISCONTINUITY
#EXT-X-CUE-OUT:DURATION=15
#EXTINF:3.0000,
http://mock.com/ad2/ad1_0_av.ts
#EXTINF:3.0000,
http://mock.com/ad2/ad2_0_av.ts
#EXTINF:3.0000,
http://mock.com/ad2/ad3_0_av.ts
#EXTINF:3.0000,
http://mock.com/ad2/ad4_0_av.ts
#EXTINF:3.0000,
http://mock.com/ad2/ad5_0_av.ts
#EXT-X-DISCONTINUITY
#EXT-X-CUE-IN
#EXTINF:9.0000,
segment2_0_av.ts
#EXTINF:9.0000,
segment3_0_av.ts
#EXTINF:9.0000,
segment4_0_av.ts
#EXTINF:9.0000,
segment5_0_av.ts
#EXTINF:9.0000,
segment6_0_av.ts
#EXTINF:9.0000,
segment7_0_av.ts
#EXTINF:9.0000,
segment8_0_av.ts
#EXTINF:9.0000,
segment9_0_av.ts
#EXTINF:6.2660,
segment10_0_av.ts
#EXT-X-ENDLIST
```

## Example
```
const HLSSpliceVod = require("./index")


const hlsVod = new HLSSpliceVod(
    'https://maitv-vod.lab.eyevinn.technology/stswe17-ozer.mp4/master.m3u8'
);

console.log('hlsVod:', hlsVod)

hlsVod.load()
    .then(() => {
        return hlsVod.insertAdAt(
            20000,
            'https://maitv-vod.lab.eyevinn.technology/ads/apotea-15s.mp4/master.m3u8'
        );
    })
    .then(() => {
        const mediaManifest = hlsVod.getMediaManifest(4928000);
        console.log(mediaManifest);
    })
```

`output`
```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-ALLOW-CACHE:YES
#EXT-X-TARGETDURATION:11
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:10.8800,
2000-00000.ts
#EXTINF:7.2000,
2000-00001.ts
#EXTINF:7.2000,
2000-00002.ts
#EXT-X-DISCONTINUITY
#EXT-X-CUE-OUT:DURATION=15.120000000000001
#EXTINF:10.8800,
https://maitv-vod.lab.eyevinn.technology/ads/apotea-15s.mp4/2000/2000-00000.ts
#EXTINF:4.2400,
https://maitv-vod.lab.eyevinn.technology/ads/apotea-15s.mp4/2000/2000-00001.ts
#EXT-X-DISCONTINUITY
#EXT-X-CUE-IN
#EXTINF:7.2000,
2000-00003.ts
#EXTINF:10.8000,
2000-00004.ts
#EXTINF:7.2000,
2000-00005.ts
#EXTINF:7.2000,
2000-00006.ts
#EXTINF:7.2000,
2000-00007.ts
#EXTINF:7.2000,
2000-00008.ts
#EXTINF:10.8000,
2000-00009.ts
#EXTINF:7.2000,
2000-00010.ts
#EXTINF:7.2000,
2000-00011.ts
#EXTINF:7.2000,
2000-00012.ts
#EXTINF:10.8000,
2000-00013.ts
#EXTINF:7.2000,
2000-00014.ts
#EXTINF:7.2000,
2000-00015.ts
#EXTINF:7.2000,
2000-00016.ts
#EXTINF:7.2000,
2000-00017.ts
#EXTINF:10.8000,
2000-00018.ts
#EXTINF:7.2000,
2000-00019.ts
#EXTINF:7.2000,
2000-00020.ts
#EXTINF:7.2000,
2000-00021.ts
#EXTINF:10.8000,
2000-00022.ts
#EXTINF:7.2000,
2000-00023.ts
#EXTINF:7.2000,
2000-00024.ts
#EXTINF:7.2000,
2000-00025.ts
#EXTINF:7.2000,
2000-00026.ts
#EXTINF:10.8000,
2000-00027.ts
#EXTINF:7.2000,
2000-00028.ts
#EXTINF:7.2000,
2000-00029.ts
#EXTINF:7.2000,
2000-00030.ts
#EXTINF:10.8000,
2000-00031.ts
#EXTINF:7.2000,
2000-00032.ts
#EXTINF:7.2000,
2000-00033.ts
#EXTINF:7.2000,
2000-00034.ts
#EXTINF:7.2000,
2000-00035.ts
#EXTINF:10.8000,
2000-00036.ts
#EXTINF:7.2000,
2000-00037.ts
#EXTINF:7.2000,
2000-00038.ts
#EXTINF:7.2000,
2000-00039.ts
#EXTINF:10.8000,
2000-00040.ts
#EXTINF:7.2000,
2000-00041.ts
#EXTINF:7.2000,
2000-00042.ts
#EXTINF:7.2000,
2000-00043.ts
#EXTINF:7.2000,
2000-00044.ts
#EXTINF:10.8000,
2000-00045.ts
#EXTINF:7.2000,
2000-00046.ts
#EXTINF:7.2000,
2000-00047.ts
#EXTINF:7.2000,
2000-00048.ts
#EXTINF:10.8000,
2000-00049.ts
#EXTINF:7.2000,
2000-00050.ts
#EXTINF:7.2000,
2000-00051.ts
#EXTINF:7.2000,
2000-00052.ts
#EXTINF:7.2000,
2000-00053.ts
#EXTINF:10.8000,
2000-00054.ts
#EXTINF:7.2000,
2000-00055.ts
#EXTINF:7.2000,
2000-00056.ts
#EXTINF:7.2000,
2000-00057.ts
#EXTINF:10.8000,
2000-00058.ts
#EXTINF:7.2000,
2000-00059.ts
#EXTINF:7.2000,
2000-00060.ts
#EXTINF:7.2000,
2000-00061.ts
#EXTINF:7.2000,
2000-00062.ts
#EXTINF:10.8000,
2000-00063.ts
#EXTINF:7.2000,
2000-00064.ts
#EXTINF:7.2000,
2000-00065.ts
#EXTINF:7.2000,
2000-00066.ts
#EXTINF:10.8000,
2000-00067.ts
#EXTINF:7.2000,
2000-00068.ts
#EXTINF:7.2000,
2000-00069.ts
#EXTINF:7.2000,
2000-00070.ts
#EXTINF:7.2000,
2000-00071.ts
#EXTINF:10.8000,
2000-00072.ts
#EXTINF:7.2000,
2000-00073.ts
#EXTINF:7.2000,
2000-00074.ts
#EXTINF:7.2000,
2000-00075.ts
#EXTINF:10.8000,
2000-00076.ts
#EXTINF:7.2000,
2000-00077.ts
#EXTINF:7.2000,
2000-00078.ts
#EXTINF:7.2000,
2000-00079.ts
#EXTINF:7.2000,
2000-00080.ts
#EXTINF:10.8000,
2000-00081.ts
#EXTINF:7.2000,
2000-00082.ts
#EXTINF:7.2000,
2000-00083.ts
#EXTINF:7.2000,
2000-00084.ts
#EXTINF:10.8000,
2000-00085.ts
#EXTINF:7.2000,
2000-00086.ts
#EXTINF:7.2000,
2000-00087.ts
#EXTINF:7.2000,
2000-00088.ts
#EXTINF:7.2000,
2000-00089.ts
#EXTINF:10.8000,
2000-00090.ts
#EXTINF:7.2000,
2000-00091.ts
#EXTINF:7.2000,
2000-00092.ts
#EXTINF:7.2000,
2000-00093.ts
#EXTINF:10.8000,
2000-00094.ts
#EXTINF:7.2000,
2000-00095.ts
#EXTINF:7.2000,
2000-00096.ts
#EXTINF:7.2000,
2000-00097.ts
#EXTINF:7.2000,
2000-00098.ts
#EXTINF:10.8000,
2000-00099.ts
#EXTINF:7.2000,
2000-00100.ts
#EXTINF:7.2000,
2000-00101.ts
#EXTINF:7.2000,
2000-00102.ts
#EXTINF:10.8000,
2000-00103.ts
#EXTINF:7.2000,
2000-00104.ts
#EXTINF:7.2000,
2000-00105.ts
#EXTINF:7.2000,
2000-00106.ts
#EXTINF:7.2000,
2000-00107.ts
#EXTINF:10.8000,
2000-00108.ts
#EXTINF:7.2000,
2000-00109.ts
#EXTINF:7.2000,
2000-00110.ts
#EXTINF:7.2000,
2000-00111.ts
#EXTINF:10.8000,
2000-00112.ts
#EXTINF:7.2000,
2000-00113.ts
#EXTINF:7.2000,
2000-00114.ts
#EXTINF:7.2000,
2000-00115.ts
#EXTINF:7.2000,
2000-00116.ts
#EXTINF:10.8000,
2000-00117.ts
#EXTINF:7.2000,
2000-00118.ts
#EXTINF:7.2000,
2000-00119.ts
#EXTINF:7.2000,
2000-00120.ts
#EXTINF:10.8000,
2000-00121.ts
#EXTINF:7.2000,
2000-00122.ts
#EXTINF:7.2000,
2000-00123.ts
#EXTINF:7.2000,
2000-00124.ts
#EXTINF:7.2000,
2000-00125.ts
#EXTINF:10.8000,
2000-00126.ts
#EXTINF:7.2000,
2000-00127.ts
#EXTINF:7.2000,
2000-00128.ts
#EXTINF:7.2000,
2000-00129.ts
#EXTINF:10.8000,
2000-00130.ts
#EXTINF:7.2000,
2000-00131.ts
#EXTINF:7.2000,
2000-00132.ts
#EXTINF:7.2000,
2000-00133.ts
#EXTINF:7.2000,
2000-00134.ts
#EXTINF:10.8000,
2000-00135.ts
#EXTINF:7.2000,
2000-00136.ts
#EXTINF:7.2000,
2000-00137.ts
#EXTINF:7.2000,
2000-00138.ts
#EXTINF:10.8000,
2000-00139.ts
#EXTINF:7.2000,
2000-00140.ts
#EXTINF:7.2000,
2000-00141.ts
#EXTINF:7.2000,
2000-00142.ts
#EXTINF:7.2000,
2000-00143.ts
#EXTINF:10.8000,
2000-00144.ts
#EXTINF:7.2000,
2000-00145.ts
#EXTINF:7.2000,
2000-00146.ts
#EXTINF:7.2000,
2000-00147.ts
#EXTINF:10.8000,
2000-00148.ts
#EXTINF:7.2000,
2000-00149.ts
#EXTINF:7.2000,
2000-00150.ts
#EXTINF:7.2000,
2000-00151.ts
#EXTINF:7.2000,
2000-00152.ts
#EXTINF:10.8000,
2000-00153.ts
#EXTINF:7.2000,
2000-00154.ts
#EXTINF:7.2000,
2000-00155.ts
#EXTINF:7.2000,
2000-00156.ts
#EXTINF:10.8000,
2000-00157.ts
#EXTINF:7.2000,
2000-00158.ts
#EXTINF:7.2000,
2000-00159.ts
#EXTINF:7.2000,
2000-00160.ts
#EXTINF:7.2000,
2000-00161.ts
#EXTINF:10.8000,
2000-00162.ts
#EXTINF:7.2000,
2000-00163.ts
#EXTINF:7.2000,
2000-00164.ts
#EXTINF:7.2000,
2000-00165.ts
#EXTINF:10.8000,
2000-00166.ts
#EXTINF:7.2000,
2000-00167.ts
#EXTINF:7.2000,
2000-00168.ts
#EXTINF:7.2000,
2000-00169.ts
#EXTINF:7.2000,
2000-00170.ts
#EXTINF:10.8000,
2000-00171.ts
#EXTINF:7.2000,
2000-00172.ts
#EXTINF:7.2000,
2000-00173.ts
#EXTINF:7.2000,
2000-00174.ts
#EXTINF:10.8000,
2000-00175.ts
#EXTINF:7.2000,
2000-00176.ts
#EXTINF:7.2000,
2000-00177.ts
#EXTINF:7.2000,
2000-00178.ts
#EXTINF:7.2000,
2000-00179.ts
#EXTINF:10.8000,
2000-00180.ts
#EXTINF:7.2000,
2000-00181.ts
#EXTINF:7.2000,
2000-00182.ts
#EXTINF:7.2000,
2000-00183.ts
#EXTINF:10.8000,
2000-00184.ts
#EXTINF:7.2000,
2000-00185.ts
#EXTINF:7.2000,
2000-00186.ts
#EXTINF:7.2000,
2000-00187.ts
#EXTINF:7.2000,
2000-00188.ts
#EXTINF:10.8000,
2000-00189.ts
#EXTINF:7.2000,
2000-00190.ts
#EXTINF:7.2000,
2000-00191.ts
#EXTINF:7.2000,
2000-00192.ts
#EXTINF:10.8000,
2000-00193.ts
#EXTINF:7.2000,
2000-00194.ts
#EXTINF:7.2000,
2000-00195.ts
#EXTINF:7.2000,
2000-00196.ts
#EXTINF:7.2000,
2000-00197.ts
#EXTINF:10.8000,
2000-00198.ts
#EXTINF:7.2000,
2000-00199.ts
#EXTINF:7.2000,
2000-00200.ts
#EXTINF:7.2000,
2000-00201.ts
#EXTINF:10.8000,
2000-00202.ts
#EXTINF:7.2000,
2000-00203.ts
#EXTINF:7.2000,
2000-00204.ts
#EXTINF:7.2000,
2000-00205.ts
#EXTINF:7.2000,
2000-00206.ts
#EXTINF:10.8000,
2000-00207.ts
#EXTINF:7.2000,
2000-00208.ts
#EXTINF:7.2000,
2000-00209.ts
#EXTINF:7.2000,
2000-00210.ts
#EXTINF:10.8000,
2000-00211.ts
#EXTINF:7.2000,
2000-00212.ts
#EXTINF:7.2000,
2000-00213.ts
#EXTINF:7.2000,
2000-00214.ts
#EXTINF:7.2000,
2000-00215.ts
#EXTINF:10.8000,
2000-00216.ts
#EXTINF:7.2000,
2000-00217.ts
#EXTINF:7.2000,
2000-00218.ts
#EXTINF:7.2000,
2000-00219.ts
#EXTINF:10.8000,
2000-00220.ts
#EXTINF:7.2000,
2000-00221.ts
#EXTINF:7.2000,
2000-00222.ts
#EXTINF:7.2000,
2000-00223.ts
#EXTINF:7.2000,
2000-00224.ts
#EXTINF:10.8000,
2000-00225.ts
#EXTINF:7.2000,
2000-00226.ts
#EXTINF:7.2000,
2000-00227.ts
#EXTINF:7.2000,
2000-00228.ts
#EXTINF:10.8000,
2000-00229.ts
#EXTINF:1.7600,
2000-00230.ts
#EXT-X-ENDLIST
```

## API

```javascript
class HLSSpliceVod {
  /**
   * Load manifest to be manipulated
   */
  load(): Promise<void>
  /**
   * Insert ad located at `adMasterManifestUri` at position `offset` (milliseconds)
   */
  insertAdAt(offset: number, adMasterManifesturi: string): Promise<void>
  /**
   * Insert pre-roll bumper located at `bumperManifestUri` (not flagged as an ad)
   */
  insertBumper(bumperManifestUri: string): Promise<void>
  /**
   * Insert an ad opportunity according to interstitial DATERANGE schema at position `offset` (milliseconds)
   */
  insertInterstitialAt(offset: number, id: string, uri: string, isAssetList: boolean): Promise<void>
}
```

# Authors

This open source project is maintained by Eyevinn Technology.

## Contributors

- Jonas Rydholm Birmé (jonas.birme@eyevinn.se)

# Contributing

## Submitting Issues

We use GitHub issues to track public bugs. If you are submitting a bug, please provide the contents of the HLS manifests (master and media manifests) to make it easier to reproduce the issue and update unit tests.

## Contributing Code

We follow the [GitHub Flow](https://guides.github.com/introduction/flow/index.html) so all contributions happen through pull requests. We actively welcome your pull requests:

 1. Fork the repo and create your branch from master.
 2. If you've added code that should be tested, add tests.
 3. If you've changed APIs, update the documentation.
 4. Ensure the test suite passes.
 5. Issue that pull request!

Use 2 spaces for indentation rather than tabs. Thank you.

When submit code changes your submissions are understood to be under the same MIT License that covers the project. Feel free to contact Eyevinn Technology if that's a concern.

# Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

## Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [INSERT EMAIL ADDRESS]. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

## Attribution

This Code of Conduct is adapted from the Contributor Covenant, version 1.4, available at http://contributor-covenant.org/version/1/4

# License (MIT)

Copyright 2020 Eyevinn Technology AB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This give us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!