import {useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import BlogInformation from "../components/blog/BlogInformation";
import SEOSection from "../components/blog/SEOSection";
import OpenGraphSection from "../components/blog/OpenGraphSection";
import FAQSection from "../components/blog/FAQSection";
import LinksSection from "../components/blog/LinksSection";


export default function CreateBlog() {

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
    const navigate = useNavigate();
    const [faq, setFaq] = useState([
        {
            question:"",
            answer:"",
        }
    ]);

    const [internalLinks, setInternalLinks] = useState([""]);

    const [externalLinks, setExternalLinks] = useState([""]);


  useEffect(() => {
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

    const uploadImage = async () => {

    if (!image) {
        toast.warning("Please select an image first.");
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
        toast.success("Image uploaded successfully!");

    } catch (err) {

        console.log(err);
        toast.error(
            "Image Upload Failed"
        );

    }

    };

    const addFAQ = () => {

        setFaq([
            ...faq,
            {
                question: "",
                answer: "",
            },
        ]);

    };

    const updateFAQ = (index, field, value) => {

        const updatedFAQ = [...faq];

        updatedFAQ[index][field] = value;

        setFaq(updatedFAQ);

    };

    const removeFAQ = (index) => {

        const updatedFAQ = faq.filter((_, i) => i !== index);

        setFaq(updatedFAQ);

    };
    const addInternalLink = () => {

        setInternalLinks([...internalLinks, ""]);

    };

    const updateInternalLink = (index, value) => {

        const links = [...internalLinks];

        links[index] = value;

        setInternalLinks(links);

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

        const links = [...externalLinks];

        links[index] = value;

        setExternalLinks(links);

    };

    const removeExternalLink = (index) => {

        setExternalLinks(
            externalLinks.filter((_, i) => i !== index)
        );

    };


  const createBlog = async () => {

    try {

      await API.post("/blogs",{

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

      toast.success("Blog created successfully!");

      navigate("/blogs");

      setTitle("");
      setContent("");

    } catch (err) {

      toast.error(
            err.response?.data?.message || "Something went wrong."
        );

    }

  };

    return (
    <Layout>
        <div className="container mt-4">

        <div className="card shadow-lg">

            <div className="card-header bg-primary text-white">
            <h3>Create New Blog</h3>
            </div>

            <div className="card-body">

                <div className="accordion" id="blogAccordion">

                {/* Blog Information */}

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



                {/* SEO */}

                <SEOSection

                    metaTitle={metaTitle}
                    setMetaTitle={setMetaTitle}

                    metaDescription={metaDescription}
                    setMetaDescription={setMetaDescription}

                    canonicalUrl={canonicalUrl}
                    setCanonicalUrl={setCanonicalUrl}

                />



                {/* Open Graph */}

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

            <br />

            <button
                className="btn btn-success"
                onClick={createBlog}
            >
                Create Blog
            </button>

            </div>

        </div>

        </div>
    </Layout>
    );

}