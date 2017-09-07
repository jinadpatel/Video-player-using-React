import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YT from 'youtube-api-search';
import _ from 'lodash';
//Calling custom components from file
import SearchBar from './components/search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'
//Creating constant that holds the youtube api
const API_KEY = "AIzaSyC-9m_mGezYUK4p2fyWhuegNER94ZjmEwk";

class App extends Component {
    constructor(props){
        super(props);
        
        this.state={videos:[],
                    selectedVideo: null
                   };
        this.videoSearch('Ganesh Aarti');
        
    }
        videoSearch(term){
            YT({key:API_KEY, term: term}, (videos)=>{
                this.setState({ videos:videos,
                                selectedVideo: videos[0]
                              });
            });    
        }
     
    
    
    render(){
        
        const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);
        return (
            <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail  video={this.state.selectedVideo}/>
            <VideoList 
                onVideoClick={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));