import React from 'react';
import '../index.css';

const NewsItem = (props) => {
    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
        const day = formattedDate.split(' ')[0];
        const suffix = day.endsWith('1') && !day.endsWith('11') ? 'st' :
                       day.endsWith('2') && !day.endsWith('12') ? 'nd' :
                       day.endsWith('3') && !day.endsWith('13') ? 'rd' : 'th';
        const time = new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${formattedDate.replace(day, `${day}${suffix}`)} at ${time}`;
    };

    const { title, description, imageUrl, newsUrl, author, date, source } = props;
    const formattedDate = formatDate(date); // Format date as "19th Jan 1994 at 10:30 AM"

    return (
        <div className="my-3">
            <div className="card">
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                    {source}
                    <span className="visually-hidden">unread messages</span>
                </span>
                <img src={imageUrl ? imageUrl : "https://www.cnn.com/audio/static/images/podcasts/chasing-life/wide.880809e3.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-black font-weight-bold">{title}..</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text">
                        <small className="text-body-secondary">By : {author} on {formattedDate}</small>
                    </p>
                    <a href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
