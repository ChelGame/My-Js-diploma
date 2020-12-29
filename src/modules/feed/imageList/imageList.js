//

    import React from 'react';
    import {Link} from "react-router-dom";

//

function ImageList(props) {

    return (
        <ul className="imageList">
        {props.imageList.map((image, index) => (

            <li key={image.id} id={image.id} data-index={index}>
                <div className="image_info">
                    <a className="imageAuthor" href={image.user.links.self} target="_blank" rel="noopener noreferrer">
                    {props.getName(image.user.first_name, image.user.last_name)}
                    </a>

                    <p className="imageTime">{props.getDate(image.created_at)}</p>
                </div>

                <Link to="image" onClick={
                    (e) => {
                        props.viewImage(e);
                    }
                }>
                    <img src={image.urls.regular} alt={image.alt_description}/>
                </Link>

                <div>
                    <button className="imageLike" data-liked={image.liked_by_user} onClick={(e) => props.like(e, image)}>

                        <svg width="30" height="30" viewBox="0 0 39 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.275 0.625C24.7812 0.630396 21.5084 2.33442 19.5 5.19309C17.4916 2.33442 14.2187 0.630396 10.725 0.625C5.01147 0.625 0 5.94085 0 12C0 17.9052 3.33442 23.9872 9.64336 29.589C12.5665 32.1795 15.773 34.4314 19.2017 36.3023C19.3889 36.3988 19.6111 36.3988 19.7983 36.3023C23.2258 34.4314 26.4313 32.1792 29.3535 29.589C35.6656 23.9872 39 17.9052 39 12C39 5.94085 33.9885 0.625 28.275 0.625V0.625ZM19.5 34.9858C17.1126 33.6684 1.3 24.4643 1.3 12C1.3 6.63306 5.70369 1.925 10.725 1.925C14.1267 1.93103 17.2625 3.76614 18.9338 6.72922C19.0588 6.92029 19.2718 7.03518 19.5 7.03518C19.7282 7.03518 19.9412 6.92029 20.0662 6.72922C21.7375 3.76614 24.8733 1.93103 28.275 1.925C33.2963 1.925 37.7 6.63306 37.7 12C37.7 24.4643 21.8874 33.6684 19.5 34.9858Z"/>
                        </svg>

                        <span className="image_likes">{image.likes}</span>
                    </button>
                </div>
            </li>

        ))}
        </ul>
    );
}

export default ImageList
