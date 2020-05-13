# VerifyVOD
## Project to verify is vod url exists, in this project there is a json called input.json that contains informaction abourt the vod that we want to probe. 

### Previous requirements:
[Node JS](https://nodejs.org/en/download/)
or
[Node JS Docker Image](https://hub.docker.com/_/node/)

[FFmpeg](https://www.ffmpeg.org/)


### Configurations:
In input.json file there are some options for the main functions, these are:
* ip: For the request url, this is the base of vod stream url.
* vodNames: The names of videos to test, with extentions, or as they are supposed to be named in nginx route

User can modify these values as it is needed.

### To start project:
```
npm install
```
### To run project:
```
node index.js
```

In output.json you will have a json containing the result of probes, something like:
```
{
    "found":[
        "test1.mkv",
        "test3.mkv"
    ], 
    "notFound":[
        "test2.mkv"
    ]
}
```
