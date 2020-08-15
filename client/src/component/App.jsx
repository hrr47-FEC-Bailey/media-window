import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import styled from 'styled-components';
import CurrentMediaPlayer from "./CurrentMediaPlayer.jsx";
import MediaList from "./MediaList.jsx";
import Title from "./Title.jsx";

//STYLES
const Body = styled.div`
margin-bottom: 32px;
width: 940px;
margin: 0 auto;
display: block;
font-family: Arial, Helvetica, sans-serif;
color: #c6d4df;
background-color: #1b2838;
font-size: 12px;
`;
const GameTitle = styled(Body)`
  &&& {
    padding-top: 0px;
    max-width: 948px;
    margin: 0 auto;
    color: white;
    font-size: 26px;
    font-family: Motiva Sans, Sans-Serif;
    line-height: 32px;
  }
`
const LeftCol = styled.div`
    width: 616px;
    float: left;
    display: block;
    margin-right: 16px;
    position: relative;
    background-color: #000000;
`;

const MainImage = styled(Body)`
  &&& {
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 1;
  }
`;

const ScrollStrip = styled.div`
    margin-top: 4px;
    position: relative:
    height: 69px;
    margin-bottom: 4px;
`;

const Grid = styled.div`
  width: 1202px;
  position: absolute;
`;
const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: hidden;
`;
const Col = styled.div`
  flex-direction: row;
  vertical-align: middle;
  flex-wrap: nowrap;
  justify-content: flex-start;
  height: 65px;
  width: 116px;
  background: transparent;
  line-height: 65px;
  margin: 5px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ScrollCol = styled.div`
  line-height: 10px;
  vertical-align: middle;
`;

const Prev = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100%;
  cursor: pointer;
  color: white;
  transition: 0.6s ease;
  margin-right: 5px;
`;

const Next = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100%;
  cursor: pointer;
  color: white;
  transition: 0.6s ease;
  margin-left: 5px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      images: [],
      video: [],
      currentMedia: '',

    }
    this.getData = this.getData.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.borderSelect = this.borderSelect.bind(this);
  }

  componentDidMount() {
    this.getData();
  }


  getData() {
    axios.get('/api/mediaData/2')
    .then(({data}) => {
      let imagesArr = [];
      let videoArr = [];
      for (let i = 0; i < data.photoArr.length; i++) {
        imagesArr.push({image: data.photoArr[i], isActive: false});
      }
      for (let j = 0; j < data.videoArr.length; j++) {
        videoArr.push({video: data.videoArr[j], isActive: true});
      }
      this.setState({
        data: data,
        currentMedia: data.videoArr[0],
        images: imagesArr,
        video: videoArr,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  changeMedia(media) {
    this.setState({
      currentMedia: media,
    });
  }

  scrollLeft() {
    let current = this.state.currentMedia;
    let arr = current.split('.');
    let currentIndex;
    for (var i = 0; i < this.state.images.length; i++) {
      if (current === this.state.images[i].image) {
        currentIndex = i;
      }
    }
    let lastIndex = this.state.images.length - 1;
    if (arr.indexOf('jpeg') > -1) {
      if (currentIndex === 0) {
        this.borderSelect(this.state.video[0].video);
        this.setState({
          currentMedia: this.state.video[0].video,
        });
      } else {
        this.borderSelect(this.state.images[currentIndex - 1].image);
        this.setState({
          currentMedia: this.state.images[currentIndex - 1].image,
        });
      }
    } else if (arr.indexOf('jpeg') < 0) {
      this.borderSelect(this.state.images[lastIndex].image);
      this.setState({
        currentMedia: this.state.images[lastIndex].image,
      });
    }
  }

  scrollRight() {
    let current = this.state.currentMedia;
    let arr = current.split('.');
    let currentIndex;
    for (var i = 0; i < this.state.images.length; i++) {
      if (current === this.state.images[i].image) {
        currentIndex = i;
      }
    }
    let lastIndex = this.state.images.length - 1;
    if (arr.indexOf('jpeg') > -1) {
      if (this.state.images[currentIndex].image !== this.state.images[lastIndex].image) {
        this.borderSelect(this.state.images[currentIndex + 1].image);
        this.setState({
          currentMedia: this.state.images[currentIndex + 1].image,
        });
      } else if (this.state.images[currentIndex].image === this.state.images[this.state.images.length -1].image) {
        this.borderSelect(this.state.video[0].video);
        this.setState({
          currentMedia: this.state.video[0].video,
        });
      }
    } else {
      this.borderSelect(this.state.images[0].image);
      this.setState({
        currentMedia: this.state.images[0].image,
      });
    }
  }

  borderSelect(media) {
    let imageArr = this.state.images.slice();
    let videoArr = this.state.video.slice();
    for (let i = 0; i < imageArr.length; i++) {
      if (imageArr[i]['isActive'] === true) {
        imageArr[i]['isActive'] = false;
      } else if (media === imageArr[i]['image']) {
        imageArr[i]['isActive'] = true;
      } else if (videoArr[0]['isActive'] === true) {
        videoArr[0]['isActive'] = false;
      } else if (media === videoArr[0]['video']) {
        videoArr[0]['isActive'] = true;
      }
    }
    this.setState({
      images: imageArr,
      video: videoArr,
    });
  }

  render() {
    return (
      <Body>
        <Title currentGame={this.state.data} />
        <LeftCol>
          <MainImage>
            <CurrentMediaPlayer currentMedia={this.state.currentMedia} />
          </MainImage>
          <Grid>
            <MediaList
            images={this.state.images}
            video={this.state.video}
            changeMedia={this.changeMedia.bind(this)}
            borderSelect={this.borderSelect.bind(this)}/>
            <Row>
              <ScrollCol>
                <Prev onClick={this.scrollLeft}>&#10094;</Prev>
              </ScrollCol>
              <ScrollCol>
                <Next onClick={this.scrollRight}>&#10095;</Next>
              </ScrollCol>
            </Row>
          </Grid>
        </LeftCol>
      </Body>
    );
  }
}

export default App;
