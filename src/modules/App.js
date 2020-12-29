import React from 'react';
import Auth from './login/login';
import Feed from './feed/feed';
import Image from './image/image';
import {toJson} from 'unsplash-js';
import {connect} from 'react-redux';
import {getImage, login, like, unlike, viewImage,} from '../actions/actions';
import {getUnsplash, getName, getDate, checkURL} from '../func/functions';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// window.onerror = function() {
//     window.location.assign('error.html');
// };

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unsplash: getUnsplash(this.props.code),
        };

        this.login = this.login.bind(this);
        this.relocation = this.relocation.bind(this);
        this.like = this.like.bind(this);
        this.viewImage = this.viewImage.bind(this);
    }

    login() {

        const code = window.location.search.split('code=')[1];
        window.history.replaceState('', 'ImageVievwer', '/');

        if (code) {
            this.state.unsplash.auth.userAuthentication(code)
            .then(toJson)
            .then(json => {
                let imageCount = this.props.imageCount;
                ++imageCount;

                this.state.unsplash.photos.listPhotos(imageCount, 10, 'latest')
                .then(toJson)
                .then(newImages => {
                    this.props.getImage(newImages, imageCount);
                    this.props.login(json.access_token);
                })
            });
        }
    }

    relocation() {

        if (checkURL()) window.location.assign('/feed');
    }

    like(e, image) {
        if (e.currentTarget.className === 'imageLike') {
            const liked = e.currentTarget.dataset.liked;
            if (liked === 'true') {
                this.state.unsplash.photos.unlikePhoto(image.id)
                .then(this.props.toJson)
                .then(json => {
                    let list = this.props.imageList;
                    list = list.map((photo) => {
                        if (photo.id === image.id) {
                            let changedPhoto = {...photo};

                            changedPhoto.liked_by_user = false;
                            changedPhoto.likes = --changedPhoto.likes;

                            return changedPhoto;
                        }
                        return photo;
                    });
                    this.props.unlike(list);
                });
            } else {
                this.state.unsplash.photos.likePhoto(image.id)
                .then(this.props.toJson)
                .then(json => {
                    let list = this.props.imageList;
                    list = list.map((photo) => {
                        if (photo.id === image.id) {
                            let changedPhoto = {...photo};

                            changedPhoto.liked_by_user = true;
                            changedPhoto.likes = ++changedPhoto.likes;

                            return changedPhoto;
                        }
                        return photo;
                    });
                    this.props.like(list);
                });
            }
        }
    }

    viewImage(e) {
        let index = e.target.parentNode.parentNode.dataset.index;
        this.props.viewImage(index);
    }

    render() {
        if (!this.props.auth) {
            this.login();
        } else {
            this.relocation();
        }

        return (
            <Router>
                <Switch>
                    <Route path="/image">
                        <Image
                            getName={getName}
                            getDate={getName}
                            unsplash={this.state.unsplash}
                            toJson={toJson}

                            index={this.props.index}
                            imageList={this.props.imageList}
                            like={this.like}
                        />
                    </Route>

                    <Route path="/feed">
                        <Feed
                            getName={getName}
                            getDate={getDate}
                            unsplash={this.state.unsplash}
                            toJson={toJson}

                            imageCount={this.props.imageCount}
                            imageList={this.props.imageList}
                            viewImage={this.viewImage}
                            getImage={this.props.getImage}
                            like={this.like}
                        />
                    </Route>

                    <Route path="/">
                        <Auth/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth       : state.loginReducer.auth,
        imageList  : state.imageReducer.imageList,
        imageCount : state.imageReducer.imageCount,
        index      : state.imageReducer.index,
        code       : state.loginReducer.code,
    }
}

const mapDispatchToProps = dispatch => {
    return {
            login: (code)                  => { dispatch( login(code) ) },
         getImage: (imageList, imageCount) => { dispatch( getImage(imageList, imageCount) ) },
             like: (imageList)             => { dispatch( like(imageList) ) },
           unlike: (imageList)             => { dispatch( unlike(imageList) ) },
        viewImage: (index)                 => { dispatch( viewImage(index) ) },
    }
}

const RenderApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default RenderApp;
