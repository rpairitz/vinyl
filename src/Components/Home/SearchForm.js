// stateless child component
const SearchForm = ({ searchString, onChange, onSubmit }) => {
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
                        value={searchString}
                        onChange={onChange}
                        name="string"
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
