export default function LinksSection({

    internalLinks,
    addInternalLink,
    updateInternalLink,
    removeInternalLink,

    externalLinks,
    addExternalLink,
    updateExternalLink,
    removeExternalLink,

}) {

    return (

        <div className="accordion-item">

            <h2 className="accordion-header">

                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#links"
                >

                    🔗 Internal & External Links

                </button>

            </h2>

            <div
                id="links"
                className="accordion-collapse collapse"
            >

                <div className="accordion-body">

                    {/* ================= INTERNAL LINKS ================= */}

                    <h5 className="mb-3">

                        Internal Links

                    </h5>

                    {

                        internalLinks.map((link,index)=>(

                            <div
                                className="input-group mb-3"
                                key={index}
                            >

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="/blog/react"

                                    value={link}

                                    onChange={(e)=>
                                        updateInternalLink(
                                            index,
                                            e.target.value
                                        )
                                    }

                                />

                                {

                                    internalLinks.length>1 && (

                                        <button

                                            className="btn btn-danger"

                                            onClick={()=>
                                                removeInternalLink(index)
                                            }

                                        >

                                            Remove

                                        </button>

                                    )

                                }

                            </div>

                        ))

                    }

                    <button

                        className="btn btn-primary mb-4"

                        onClick={addInternalLink}

                    >

                        + Add Internal Link

                    </button>

                    <hr/>

                    {/* ================= EXTERNAL LINKS ================= */}

                    <h5 className="mb-3">

                        External Links

                    </h5>

                    {

                        externalLinks.map((link,index)=>(

                            <div
                                className="input-group mb-3"
                                key={index}
                            >

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="https://google.com"

                                    value={link}

                                    onChange={(e)=>
                                        updateExternalLink(
                                            index,
                                            e.target.value
                                        )
                                    }

                                />

                                {

                                    externalLinks.length>1 && (

                                        <button

                                            className="btn btn-danger"

                                            onClick={()=>
                                                removeExternalLink(index)
                                            }

                                        >

                                            Remove

                                        </button>

                                    )

                                }

                            </div>

                        ))

                    }

                    <button

                        className="btn btn-success"

                        onClick={addExternalLink}

                    >

                        + Add External Link

                    </button>

                </div>

            </div>

        </div>

    );

}