import hero_img from "../../img/billboard.jpg";
import er_diagram_img from "../../img/er-diagram-revised.jpeg";

const Project = () => {
    return (
        <> {/* this is so we don't get error related to a single parent element */}
        <div class="bordered">
            <h1 class="head">Vinyl: A Charting Summary</h1>
            <p class="head">
        No more having to rely on tweets from Billboard to see basic stats for
        your favorite songs. On <b>Vinyl</b>, just search a song, and see how
        many weeks the song charted at what position and more. As a bonus
        feature, <b>Vinyl</b> will also present you with similar songs.
            </p>
        </div>
        <br />
        <img id="main" alt=""/>
        <img id="fixed" src={hero_img} alt=""/>

        <br />
        <div class="bordered">
            <h2>How It Works</h2>
            <p>
        Our comprehensive web application will allow users to find relevant
        information on their favorite songs. This can include charting
        information, song popularity, and similar songs, using spotify playlist
        data to cross reference songs and determine similarity to give
        recommendations.
            </p>
            <h2>Usefulness</h2>
            <p>
        There is no centralized place where users can find information about
        their favorite songs. We want to create a dedicated tool where users can
        find chart information and who made a song, and receive suggestions for
        similar songs on an app for music lovers made by music lovers.
            </p>
            <h2>Realness</h2>
            <p>
        We are using data from Billboard Hot 100 Charting Data and a million
        Spotify playlists. Here are the links:
            </p>
            <ul>
                <li>
                <a
                    href="https://data.world/kcmillersean/billboard-hot-100-1958-2017/workspace/file?filename=Hot+Stuff.csv"
                    >Data World: Billboard Hot 100 (1959-2017)</a
                >
                </li>
                <li>
                <a
                    href="https://www.kaggle.com/dhruvildave/billboard-the-hot-100-songs"
                    >Kaggle: Billboard Hot 100</a
                >
                </li>
                <li>
                <a
                    href="https://www.aicrowd.com/challenges/spotify-million-playlist-dataset-challenge"
                    >AI Crowd: Million Spotify Playlists</a
                >
                </li>
            </ul>
            <h2>Functionality</h2>
            <h3>Basic Functions</h3>
            <p>
        Insert - Music data is periodically updated in the backend of the
        database
            </p>
            <p>
        Update - Music data is periodically updated in the backend of the
        database
            </p>
            <p>
        Delete - Data can be manually removed from the backend of the database
            </p>
            <p>
        Search - Search for songs by artist and title name, sort songs in order
        of popularity, show songs
            </p>
            <h3>Advanced Functions</h3>
            <p>
        Song Recommendation - Based on a song that is searched, new song
        recommendations are presented to the user. Users could find this
        especially helpful, as the recommendations would come from Spotify
        playlist data.
            </p>
            <p>
        Conception Song Prediction - As a hidden bonus feature, the user can
        enter his/her birthday, and the application will predict, based on the
        Billboard charting data, what song(s) you could have been conceived to.
        This is for jesting purposes.
            </p>
            <br />
            <h2>ER Diagram</h2>
            <img id="er" src={er_diagram_img} alt="ER diagram"/>
            <p>
        Each song has a unique song id we assign to it, as well as a title,
        artist, and peak rank attributes. The data types will be uuid, varchar,
        varchar, and integer, respectively. For each song we compute the twenty
        songs that most commonly overlap with it in playlists; we take this as a
        measure of similarity. The proportion of playlists that x is in that y
        is also in is the affinity score of y for x. So for each song we store
        the id of one of its close matches plus corresponding affinity score.
        This captures the many-to-many relationship of having an affinity score
        between songs.
            </p>
            <p>
        Additionally, every song has chart position data. Each chart position
        entry has a song id (matching the song id used by the song entity) as
        well as a date, which collectively make up the primary key. These are
        unique because for any given date a song is only on the Billboard Hot
        100 in one position. We also store the song's rank, previous rank, and
        weeks in the top 100 as of the date. The relationship between songs and
        chart entries is one-to-many; every song has multiple chart entries, but
        every chart entry refers to one specific song. Note that we are removing
        from our dataset any song which has never appeared in the top 100, so
        this is a mandatory relationship and every song will have at least one
        chart entry.
            </p>
            <p>
        We may make a lookup table for quickly getting song id from song title
        and artist, but that's not really something we've talked about in class
        and it's a conversation we'd like to have with you about whether it
        would improve performance. We could just use title and artist as a
        primary key in the song table, but the concern would be that a song
        might be listed under multiple titles/artists in our different datasets
        and we want to deal with that by just assigning both title,artist tuples
        to the same song id.
            </p>
        </div>

        {/* close parent */}
        </> 
    );
}

export default Project;