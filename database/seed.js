const faker = require('faker');
const mongoModel = require('../database/index');


function generateData() {
  let games = [];
  var videos = ["https://www.youtube.com/embed/JSRtYpNRoN0", "https://www.youtube.com/embed/X1p-_CNtL9w", "https://www.youtube.com/embed/TUHJ3ofLDs8", "https://www.youtube.com/embed/21hG1oZwQjk", "https://www.youtube.com/embed/RfLPGMOqg98", "https://www.youtube.com/embed/xXiOtv8I2Jk", "https://www.youtube.com/embed/xTpr7piQu2M", "https://www.youtube.com/embed/Jmliox1trPQ", "https://www.youtube.com/embed/Fmdb-KmlzD8", "https://www.youtube.com/embed/a3ZGGIdpfEM", "https://www.youtube.com/embed/EV2J1YPNnjo", "https://www.youtube.com/embed/2gUtfBmw86Y", "https://www.youtube.com/embed/q4GdJVvdxss", "https://www.youtube.com/embed/8pR0o2fGyHg"];
  const random = () => Math.floor(Math.random() * videos.length);
  let imageId = 10;
  for (let id = 1; id <= 100; id++) {
    let index = random();
    let title = faker.commerce.productName();
    let description = faker.lorem.paragraph();
    let photoArr = [];
    let videoArr = videos[index];
    if (imageId > 268) {
      imageId = 2;
    }
    let i = 0;
    let j = 0;
    while (i < 6) {
      let photo = `https://fecbailey.s3-us-west-1.amazonaws.com/image${imageId}.jpg`
      photoArr.push(photo);
      i++;
      imageId++;
    }
    games.push({
      'id': id,
      'title': title,
      'description': description,
      'photoArr': photoArr,
      'videoArr': videoArr
    });
    imageId += 6;
  }
  return games;
}
var seededData = generateData();

mongoModel.save(seededData);

