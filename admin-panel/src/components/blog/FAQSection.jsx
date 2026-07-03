export default function FAQSection({
    faq,
    addFAQ,
    updateFAQ,
    removeFAQ,
}) {

    return (

        <div className="accordion-item">

            <h2 className="accordion-header">

                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq"
                >
                    ❓ Frequently Asked Questions
                </button>

            </h2>

            <div
                id="faq"
                className="accordion-collapse collapse"
            >

                <div className="accordion-body">

                    {

                        faq.map((item, index) => (

                            <div
                                key={index}
                                className="card mb-3 border"
                            >

                                <div className="card-body">

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Question

                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Question"
                                            value={item.question}
                                            onChange={(e)=>
                                                updateFAQ(
                                                    index,
                                                    "question",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Answer

                                        </label>

                                        <textarea
                                            rows="3"
                                            className="form-control"
                                            placeholder="Enter Answer"
                                            value={item.answer}
                                            onChange={(e)=>
                                                updateFAQ(
                                                    index,
                                                    "answer",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    {

                                        faq.length > 1 && (

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removeFAQ(index)}
                                            >

                                                Remove FAQ

                                            </button>

                                        )

                                    }

                                </div>

                            </div>

                        ))

                    }

                    <button
                        className="btn btn-primary"
                        onClick={addFAQ}
                    >

                        + Add FAQ

                    </button>

                </div>

            </div>

        </div>

    );

}