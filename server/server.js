const express = require("express");
const app = express();
const port = process.env.PORT || 3800;

// Store and retrieve your videos from here
let videos = require("../client/src/exampleResponse.json");
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
app.use(express.json())
// GET "/"
app.get("/", (req, res) => {
  res.json(videos)
});


//Get one video, specified by an ID
app.get("/:id", function(req, res){
  const id = parseInt(req.params.id);
  const filteredId = videos.find(video => video.id === id);

  if(filteredId){
    res.json(filteredId)
  } else {
   res.status(404).send({
  "result": "failure",
  "message": "Video could not be deleted"
});
  }
})


//Add a new video
app.post("/", function(req, res) {
  console.log(req.body);
  const newVideo = req.body;
  newVideo.id = Math.floor(Math.random() * 10000)

  if(newVideo.title && newVideo.url){
    videos.push(newVideo);
    res.send({"id": newVideo.id})
  } else {
    res.status(400).send({
  "result": "failure",
  "message": "Video could not be saved"
})
  }
});

//Delete a video
app.delete("/:id", function(req, res){
   const id = parseInt(req.params.id);
   const videoIndex = videos
        .findIndex(video => video.id === id);
    if (videoIndex >= 0) {
        videos.splice(videoIndex, 1);
        res.sendStatus(200)
    } else {
      res.send({
  "result": "error",
  "message": "Video was unable to be deleted"
})
    }
});



app.listen(port, () => console.log(`Listening on port ${port}`));