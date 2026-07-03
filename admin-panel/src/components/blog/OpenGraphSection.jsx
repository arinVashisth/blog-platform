export default function OpenGraphSection({
    ogTitle,
    setOgTitle,

    ogDescription,
    setOgDescription,

    ogImage,
    setOgImage,

    twitterCard,
    setTwitterCard,
}) {

    return (

        <div className="accordion-item">

            <h2 className="accordion-header">

                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#openGraph"
                >
                    🌐 Open Graph & Twitter
                </button>

            </h2>

            <div
                id="openGraph"
                className="accordion-collapse collapse"
            >

                <div className="accordion-body">

                    <div className="mb-3">

                        <label className="form-label">
                            Open Graph Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Open Graph Title"
                            value={ogTitle}
                            onChange={(e) => setOgTitle(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Open Graph Description
                        </label>

                        <textarea
                            rows="3"
                            className="form-control"
                            placeholder="Open Graph Description"
                            value={ogDescription}
                            onChange={(e) => setOgDescription(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Open Graph Image URL
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="https://example.com/image.jpg"
                            value={ogImage}
                            onChange={(e) => setOgImage(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Twitter Card
                        </label>

                        <select
                            className="form-select"
                            value={twitterCard}
                            onChange={(e) => setTwitterCard(e.target.value)}
                        >

                            <option value="summary">
                                Summary
                            </option>

                            <option value="summary_large_image">
                                Summary Large Image
                            </option>

                        </select>

                    </div>

                </div>

            </div>

        </div>

    );

}