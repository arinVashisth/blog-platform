import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import BlogInformation from "../components/blog/BlogInformation";
import SEOSection from "../components/blog/SEOSection";
import OpenGraphSection from "../components/blog/OpenGraphSection";
import FAQSection from "../components/blog/FAQSection";
import LinksSection from "../components/blog/LinksSection";



export default function EditBlog() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("draft");
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState("");
    const [category, setCategory] = useState("");
    const [tag, setTag] = useState("");
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [canonicalUrl, setCanonicalUrl] = useState("");

    const [ogTitle, setOgTitle] = useState("");
    const [ogDescription, setOgDescription] = useState("");
    const [ogImage, setOgImage] = useState("");

    const [twitterCard, setTwitterCard] = useState("summary_large_image");

    const [faq, setFaq] = useState([
        {
            question: "",
            answer: "",
        },
    ]);

    const [internalLinks, setInternalLinks] = useState([""]);
    const [externalLinks, setExternalLinks] = useState([""]);

    useEffect(() => {
        fetchBlog();
        fetchCategories();
        fetchTags();
    }, []);

    const fetchCategories = async () => {

        try {

            const res = await API.get("/categories");

            setCategories(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const fetchTags = async () => {

        try {

            const res = await API.get("/tags");

            setTags(res.data);

        } catch (err) {

            console.log(err);

        }

    };

  const fetchBlog = async () => {
    try {

    const res = await API.get("/blogs");

    const blog = res.data.blogs.find((b) => b._id === id);

    if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setStatus(blog.status);
        setCategory(blog.categories?.[0] || "");
        setTag(blog.tags?.[0] || "");
        setImagePath(blog.featureImage);
        setMetaTitle(blog.metaTitle || "");
        setMetaDescription(blog.metaDescription || "");
        setCanonicalUrl(blog.canonicalUrl || "");

        setOgTitle(blog.ogTitle || "");
        setOgDescription(blog.ogDescription || "");
        setOgImage(blog.ogImage || "");

        setTwitterCard(blog.twitterCard || "summary_large_image");

        setFaq(
            blog.faq?.length
                ? blog.faq
                : [{ question: "", answer: "" }]
        );

        setInternalLinks(
            blog.internalLinks?.length
                ? blog.internalLinks
                : [""]
        );

        setExternalLinks(
            blog.externalLinks?.length
                ? blog.externalLinks
                : [""]
        );
        
    }

    } catch (err) {
      console.log(err);
    }
  };

  const updateBlog = async () => {
    try {

        await API.put(`/blogs/${id}`,{

            title,
            content,

            status,

            featureImage:imagePath,

            categories:[category],

            tags:[tag],

            metaTitle,
            metaDescription,
            canonicalUrl,

            ogTitle,
            ogDescription,
            ogImage,

            twitterCard,

            faq,

            internalLinks,

            externalLinks,

        });

      toast.success("Blog Updated Successfully!");

      navigate("/blogs");

    } catch (err) {

      toast.error(err.response?.data?.message || "Update Failed");

    }
  };

    const uploadImage = async () => {

        if (!image) {
            toast.warning("Please select an image.");
            return;
        }

        const formData = new FormData();

        formData.append("image", image);

        try {

            const res = await API.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setImagePath(res.data.path);

            toast.success("Image Uploaded!");

        } catch (err) {

            console.log(err);

            toast.error("Upload Failed");

        }

    };

    const addFAQ = () => {

        setFaq([
            ...faq,
            {
                question:"",
                answer:"",
            },
        ]);

    };

    const updateFAQ = (index, field, value) => {

        const updated = [...faq];

        updated[index][field] = value;

        setFaq(updated);

    };

    const removeFAQ = (index) => {

        setFaq(
            faq.filter((_, i) => i !== index)
        );

    };

    const addInternalLink = () => {

        setInternalLinks([...internalLinks, ""]);

    };

    const updateInternalLink = (index, value) => {

        const updated = [...internalLinks];

        updated[index] = value;

        setInternalLinks(updated);

    };

    const removeInternalLink = (index) => {

        setInternalLinks(
            internalLinks.filter((_, i) => i !== index)
        );

    };

    const addExternalLink = () => {

        setExternalLinks([...externalLinks, ""]);

    };

    const updateExternalLink = (index, value) => {

        const updated = [...externalLinks];

        updated[index] = value;

        setExternalLinks(updated);

    };

    const removeExternalLink = (index) => {

        setExternalLinks(
            externalLinks.filter((_, i) => i !== index)
        );

    };

    return (
        <Layout>
            <div className="container mt-4">

                <div className="card shadow-lg">

                    <div className="card-header bg-warning text-dark">
                        <h3>Edit Blog</h3>
                    </div>

                    <div className="card-body">

                        <div
                            className="accordion"
                            id="editBlogAccordion"
                        >

                            <BlogInformation

                                title={title}
                                setTitle={setTitle}

                                content={content}
                                setContent={setContent}

                                image={image}
                                setImage={setImage}

                                imagePath={imagePath}

                                uploadImage={uploadImage}

                                status={status}
                                setStatus={setStatus}

                                category={category}
                                setCategory={setCategory}
                                categories={categories}

                                tag={tag}
                                setTag={setTag}
                                tags={tags}

                            />

                            <SEOSection

                                metaTitle={metaTitle}
                                setMetaTitle={setMetaTitle}

                                metaDescription={metaDescription}
                                setMetaDescription={setMetaDescription}

                                canonicalUrl={canonicalUrl}
                                setCanonicalUrl={setCanonicalUrl}

                            />

                            <OpenGraphSection

                                ogTitle={ogTitle}
                                setOgTitle={setOgTitle}

                                ogDescription={ogDescription}
                                setOgDescription={setOgDescription}

                                ogImage={ogImage}
                                setOgImage={setOgImage}

                                twitterCard={twitterCard}
                                setTwitterCard={setTwitterCard}

                            />

                            <FAQSection

                                faq={faq}

                                addFAQ={addFAQ}

                                updateFAQ={updateFAQ}

                                removeFAQ={removeFAQ}

                            />

                            <LinksSection

                                internalLinks={internalLinks}

                                addInternalLink={addInternalLink}

                                updateInternalLink={updateInternalLink}

                                removeInternalLink={removeInternalLink}

                                externalLinks={externalLinks}

                                addExternalLink={addExternalLink}

                                updateExternalLink={updateExternalLink}

                                removeExternalLink={removeExternalLink}

                            />

                        </div>

                        <div className="mt-4">

                            <button
                                className="btn btn-warning btn-lg"
                                onClick={updateBlog}
                            >

                                💾 Save Changes

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
}