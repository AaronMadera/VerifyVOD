const fs = require('fs-extra');
const utilP = require('util');
const exec = utilP.promisify(require('child_process').exec);

const settings = require("./input.json");
const vods = {
    found: [],
    notFound: []
};

async function doIt() {
    try {
        let index = 0;
        while (index < (settings.vodNames.length - 1)) {
            const execs = [];
            /* Let's iterate and evaluate over 10 vod each time*/
            const prevIndex = index;
            index += 10;
            settings.vodNames.slice(prevIndex, index).forEach(vodname => {
                async function eval(url) {
                    try {
                        /* Just checking if theres is a video in that url by querying stream height */
                        const cmd = `ffprobe -v quiet -select_streams v:0 -show_entries stream=height -of json ${url}`;

                        /* If theres is a video, this command will return a json with stream height, if there is no such stream,
                        theres is going to be a thrown error or some value in sterr */
                        const { stdout, sterr } = await exec(cmd);

                        if (stdout && !sterr) return vods.found.push(url);
                        else throw Error('no such vod');
                    } catch (error) {
                        vods.notFound.push(url);
                    }
                }
                execs.push(eval(`${settings.ip}/${vodname}`))
            });

            await Promise.all(execs);
        }

        console.log(vods);

        await fs.writeFile('./output.json', JSON.stringify(vods));
    } catch (e) {
        console.log(e);
    }
}

doIt();
