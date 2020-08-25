import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './styles.css';
import CurrentMediaPlayer from './CurrentMediaPlayer.jsx';
import MediaList from './MediaList.jsx';
import Title from './Title.jsx';
import CurrentTitleImage from './CurrentTitleImage.jsx';
import CurrentDescription from './CurrentDescription.jsx';

const url = '54.215.75.98';
class MediaWindow extends React.Component {
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
    axios.get(`http://${url}:3001/api/mediaData/5`)
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
        <div className={styles.col_container}>
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
                  <div className={styles.prev} onClick={this.scrollLeft}>
                    <span></span>
                  </div>
                </div>
                <div className={styles.scroll_col}>
                  <div className={styles.next} onClick={this.scrollRight}>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right_col}>
            <CurrentTitleImage images={this.state.images}/>
            <div className={styles.description}>
              <CurrentDescription description={this.state.data.description} />
            </div>
            <div className={styles.reviews}>
              <div className={styles.recent}>Recent Reviews:</div>
              <div className={styles.recent_summary}>Very Positive</div>
            </div>
            <div className={styles.reviews_all}>
              <div className={styles.recent}>All Reviews:</div>
              <div className={styles.recent_summary}>Very Positive</div>
            </div>
            <div className={styles.release_date}>
              <div className={styles.recent}>Release Date:</div>
              <div className={styles.date}>Oct 27, 2016</div>
            </div>
            <div className={styles.reviews}>
              <div className={styles.recent}>Developer:</div>
              <div className={styles.recent_summary}>Bethesda Game Studios</div>
            </div>
            <div className={styles.reviews_all}>
              <div className={styles.recent}>Publisher:</div>
              <div className={styles.recent_summary}>Bethesda Softworks</div>
            </div>
            <div className={styles.reviews}>
              <div className={styles.popular}>Popular user-defined tags for this product:</div>
            </div>
            <div className={styles.row_tags}>
              <div className={styles.tags}>Open World</div>
              <div className={styles.tags}>RPG</div>
              <div className={styles.tags}>Adventure</div>
              <div className={styles.tags}>Single Player</div>
              <div className={styles.tags}>+</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default MediaWindow;

