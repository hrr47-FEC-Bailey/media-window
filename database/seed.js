const faker = require('faker');
const mongoModel = require('../database/index');


function generateData() {
  let games = [];

  for (let id = 1; id <= 100; id++) {

    let title = faker.commerce.productName();
    let description = faker.lorem.paragraph();
    let photoArr = [];
    let videoArr = [];
    let i = 0;
    let j = 0;
    while (i < 8) {
      let photo = faker.image.imageUrl();
      photoArr.push(photo);
      i++;
    }
    while (j < 2) {
      let video = faker.image.imageUrl();
      videoArr.push(video);
      j++;
    }
    games.push({
      'id': id,
      'title': title,
      'description': description,
      'photoArr': photoArr,
      'videoArr': videoArr
    });
  }
  return games;
}
var seededData = generateData();

mongoModel.save(seededData);

