const DevPlan = () => {
    return (
        <>
        <div class="bordered">
      <h1 class="head">Our Development Plan</h1>
    </div>
    <div class="bordered">
      <h2>Relational Schema</h2>
      <ul>
        <li>Songs(id, title, artist, peak_rank)</li>
        <li>RelatedSongs(id_1, id_2, score)</li>
        <li>ChartPositions(id, date, rank, weeks_top_100, last_rank)</li>
      </ul>
      <h3>Functional Dependencies</h3>
      <p>
        Our only FDs are based on the primary keys.
      </p>
      <ul>
        <li>Songs: id -> title, artist, peak_rank</li>
        <li>RelatedSongs: id_1, id_2 -> score</li>
        <li>ChartPositions: id, date -> rank, weeks_top_100, last rank</li>
      </ul>
      <br />
      <h2>Technical Choices</h2>
      <h3>Databases</h3>
      <p>
        Data will be stored on the student machines. The data sources are as
        follows:
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
      <h3>Software Platforms/Languages</h3>
      <ul>
        <li>MySQL</li>
        <li>JavaScript, HTML, CSS</li>
        <li>PHP</li>
      </ul>
      <br />
      <h2>Division of Labor</h2>
      <h3>Front End</h3>
      <p>Ryan Pairitz</p>
      <h3>Back End</h3>
      <p>Tarik Brown</p>
      <h3>Queries/Data Management</h3>
      <p>William Gentry</p>
      <br />
      <h2>Project Timeline</h2>
      <h3>Weekly Milestones</h3>
      <p class="indented">September 26</p>
      <ul>
        <li>Create devplan.html and link from project.html - Ryan</li>
        <li>Create project code repository - Ryan</li>
        <li>
          Load data onto db.cse.nd.edu server using MySQL and configure data to
          match ER Diagram - William
        </li>
        <li>Write Relational Schemas - William</li>
        <li>
          Create dummy data for testing endpoints and start implementing php for
          endpoints - Tarik
        </li>
      </ul>
      <p class="indented">October 3</p>
      <ul>
        <li>Implement affinity scores advanced function script - William</li>
        <li>
          Implement php to query information based on artist name and song title
          - Tarik
        </li>
        <li>Design initial homepage for project demo - Ryan</li>
        <li>Display raw billboard data for a queried song - Ryan</li>
      </ul>
      <p class="indented">October 10</p>
      <ul>
        <li>
          Flesh out front end once endpoints have been fully configured - Ryan
        </li>
        <li>
          Finish rough draft of billboard explorer where user can access song
          information through user input - Tarik, William
        </li>
        <li>
          Implement rough draft of “What Song Were You Conceived To” Function -
          Tarik, Ryan, William
        </li>
      </ul>
      <p class="indented">October 17</p>
      <ul>
        <li>Fall Break (no work)</li>
      </ul>
      <p class="indented">October 24</p>
      <ul>
        <li>Clean up all features, fix bugs - Tarik, Ryan, William</li>
      </ul>
      <p class="indented">October 29</p>
      <ul>
        <li>Turn In Project Demo - Tarik, Ryan, William</li>
        <li>Receive an A+ - Tarik, Ryan, William</li>
      </ul>
      <br />
      <br />
    </div>
        </>
    );
}

export default DevPlan;