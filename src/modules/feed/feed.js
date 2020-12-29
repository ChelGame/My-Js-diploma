//

    import React from 'react';
    import ImageList from './imageList/imageList';

//
class Feed extends React.Component{
    constructor(props) {
        super(props);

        this.scroll = React.createRef();

        this.onScrollUpload = this.onScrollUpload.bind(this);
        this.upload = this.upload.bind(this);

    }

    onScrollUpload() {
        let scrollBottom = Math.ceil(this.scroll.current.scrollTop + this.scroll.current.offsetHeight) === this.scroll.current.scrollHeight;
        if (scrollBottom) {
            this.scroll.current.removeEventListener("scroll", this.onScrollUpload);
            this.upload();
        }
    }

    upload() {

        let imageCount = this.props.imageCount;
        ++imageCount;

        this.props.unsplash.photos
            .listPhotos(imageCount, 10, 'latest')
            .then(this.props.toJson)
            .then(newImages => {
                let list = this.props.imageList;
                let set = new Set(list.concat(newImages))

                list = [];

                set.forEach((item) => {
                    list.push(item);
                });

                this.props.getImage(list, imageCount);
            });
    }

    render() {
        return (
            <section className="content" ref={this.scroll}>
                <div className="feed">
                    <ImageList
                        imageList={this.props.imageList}
                        getName={this.props.getName}
                        getDate={this.props.getDate}
                        unsplash={this.props.unsplash}
                        viewImage={this.props.viewImage}
                        like={this.props.like}
                    />

                    <button className="upload_image" onClick={this.upload}>Загрузить еще</button>
                </div>
            </section>
        );
    }

    componentDidMount() {
        this.upload();
        this.scroll.current.addEventListener("scroll", this.onScrollUpload);
    }

    componentDidUpdate() {
        this.scroll.current.addEventListener("scroll", this.onScrollUpload);
    }
}


export default Feed
