// stateless child component
// TODO: set input values
const SearchForm = ({ searchSong, onChange, onSubmit }) => {
    return (
        <div>
            <h2>Song Search</h2>
            <form onSubmit={onSubmit} autoComplete="off">
                <div className="form-group">
                    <label>Song Title or Artist</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="search-string-input"
                        value={searchSong.string}
                        onChange={onChange}
                        name="string"
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <br />
                    <input
                        type="date"
                        className="form-control"
                        id="search-date-input"
                        value={searchSong.date}
                        onChange={onChange}
                        name="date"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" onSubmit={onSubmit}>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;