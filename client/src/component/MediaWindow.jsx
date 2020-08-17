import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './styles.css';
import CurrentMediaPlayer from './CurrentMediaPlayer.jsx';
import MediaList from './MediaList.jsx';
import Title from './Title.jsx';


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
    this.autoScroll = this.autoScroll.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.autoScroll();
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
        this.changeMedia(this.state.video[0].video);
      } else {
        this.borderSelect(this.state.images[currentIndex - 1].image);
        this.changeMedia(this.state.images[currentIndex - 1].image);
      }
    } else if (arr.indexOf('jpeg') < 0) {
      this.borderSelect(this.state.images[lastIndex].image);
      this.changeMedia(this.state.images[lastIndex].image);
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
        this.changeMedia(this.state.images[currentIndex + 1].image);
      } else if (this.state.images[currentIndex].image === this.state.images[this.state.images.length -1].image) {
        this.borderSelect(this.state.video[0].video);
        this.changeMedia(this.state.video[0].video);
      }
    } else {
      this.borderSelect(this.state.images[0].image);
      this.changeMedia(this.state.images[0].image);
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

  autoScroll() {
    return setInterval(() => {
      this.scrollRight();
    }, 5000);
  }


  render() {
    return (
      <div className={styles.body}>
        <Title currentGame={this.state.data} />
        <div className={styles.left_col}>
          <div className={styles.main_image}>
            <CurrentMediaPlayer currentMedia={this.state.currentMedia} />
          </div>
          <div className={styles.grid}>
            <MediaList
            images={this.state.images}
            video={this.state.video}
            changeMedia={this.changeMedia.bind(this)}
            borderSelect={this.borderSelect.bind(this)}/>
            <div className={styles.scroll_row}>
              <div className={styles.scroll_col}>
                <div className={styles.prev} onClick={this.scrollLeft}>&#9668;</div>
              </div>
              <div className={styles.scroll_col}>
                <div className={styles.next} onClick={this.scrollRight}>&#9658;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
