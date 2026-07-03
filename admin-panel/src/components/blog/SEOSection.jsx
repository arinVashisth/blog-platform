export default function SEOSection({
    metaTitle,
    setMetaTitle,

    metaDescription,
    setMetaDescription,

    canonicalUrl,
    setCanonicalUrl,
}) {

    return (

        <div className="accordion-item">

            <h2 className="accordion-header">

                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#seo"
                >
                    🔍 SEO Settings
                </button>

            </h2>

            <div
                id="seo"
                className="accordion-collapse collapse"
            >

                <div className="accordion-body">

                    <div className="mb-3">

                        <label className="form-label">
                            Meta Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="SEO Meta Title"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Meta Description
                        </label>

                        <textarea
                            rows="4"
                            className="form-control"
                            placeholder="SEO Meta Description"
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Canonical URL
                        </label>

                        <input
                            type="url"
                            className="form-control"
                            placeholder="https://example.com/blog/my-blog"
                            value={canonicalUrl}
                            onChange={(e) => setCanonicalUrl(e.target.value)}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}