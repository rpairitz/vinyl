// stateless child component
const SpecialForm = ({ info, onChange, onSubmit }) => {
    return (
        <div>
            <h2>Fill out the form to learn what song you were conceived to</h2>
            <form onSubmit={onSubmit} autoComplete="off">
                <div className="form-group">
                    <label>Birthdate</label>
                    <br />
                    <input
                        type="date"
                        className="form-control"
                        id="birthdate-input"
                        value={info.date}
                        onChange={onChange}
                        name="date"
                    />
                </div>
                <div className="form-group">
                    <label>Parents&rsquo; Favorite Song Title (optional)</label>
                    <br />
                    <input
		    	placeholder="e.g. Mo Bamba"
                        type="text"
                        className="form-control"
                        id="special-string-input"
                        value={info.string}
                        onChange={onChange}
                        name="string"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn" onSubmit={onSubmit}>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SpecialForm;
