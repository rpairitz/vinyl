// stateless child component
const SearchForm = ({ searchString, onChange, onSubmit }) => {
    return (
        <div>
            <form onSubmit={onSubmit} autoComplete="off">
                    <input
		    	placeholder="Search by Title or Artist…"
                        type="text"
                        className="form-control"
                        id="search-string-input"
                        value={searchString}
                        onChange={onChange}
                        name="string"
                    />
                    <button type="submit" className="btn search-btn" onSubmit={onSubmit}>
                        Search
                    </button>
            </form>
        </div>
    );
};

export default SearchForm;
