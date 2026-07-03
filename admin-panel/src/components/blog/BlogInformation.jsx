export default function BlogInformation({
    title,
    setTitle,

    content,
    setContent,

    image,
    setImage,

    imagePath,

    uploadImage,

    status,
    setStatus,

    category,
    setCategory,
    categories,

    tag,
    setTag,
    tags,
}) {

    return (

        <div className="accordion-item">

            <h2 className="accordion-header">

                <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#blogInfo"
                >
                    📝 Blog Information
                </button>

            </h2>

            <div
                id="blogInfo"
                className="accordion-collapse collapse show"
            >

                <div className="accordion-body">

                    <div className="mb-3">

                        <label className="form-label">

                            Blog Title

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter blog title"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Blog Content

                        </label>

                        <textarea
                            rows="8"
                            className="form-control"
                            placeholder="Write your blog..."
                            value={content}
                            onChange={(e)=>setContent(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Feature Image

                        </label>

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e)=>setImage(e.target.files[0])}
                        />

                    </div>

                    <button
                        className="btn btn-info mb-3"
                        onClick={uploadImage}
                    >

                        Upload Image

                    </button>

                    {

                        imagePath && (

                            <div className="mb-3">

                                <img
                                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${imagePath}`}
                                    className="img-fluid rounded shadow"
                                    style={{
                                        maxHeight:"250px"
                                    }}
                                />

                            </div>

                        )

                    }

                    <div className="mb-3">

                        <label>

                            Status

                        </label>

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
                        >

                            <option value="draft">

                                Draft

                            </option>

                            <option value="published">

                                Published

                            </option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>

                            Category

                        </label>

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                        >

                            <option value="">

                                Select Category

                            </option>

                            {

                                categories.map((cat)=>(

                                    <option
                                        key={cat._id}
                                        value={cat.name}
                                    >

                                        {cat.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>

                            Tag

                        </label>

                        <select
                            className="form-select"
                            value={tag}
                            onChange={(e)=>setTag(e.target.value)}
                        >

                            <option value="">

                                Select Tag

                            </option>

                            {

                                tags.map((tag)=>(

                                    <option
                                        key={tag._id}
                                        value={tag.name}
                                    >

                                        {tag.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>

            </div>

        </div>

    );

}