import _ from 'lodash'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list.js'
import VideoDetail from './components/video_detail.js'
const  API_KEY = "AIzaSyAvA6jKpyAqFof7cTR0I6ejSbSBIvMw-DI";




// Crate a new component. this component should produce some HTML

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      videos:[],
      selectedVideo: null
  };
    this.videoSearch('surfboards')
  }

  videoSearch (term){
    YTSearch({key:API_KEY, term:term},(videos)=>{
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
       })
      //this will be like this.setState({videos:videos}) => this will only works when the variable and string are the same
    })
  }

  render(){
    const videoSearch = _.debounce((term)=> {this.videoSearch(term)},300)


    return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
          videos = {this.state.videos} />
      </div>
    );
  }

}


// Take this component's genreated HTML an dput it
//on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
