const Blog = require("../models/Blog");
const slugify = require("slugify");


const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      metaTitle,
      metaDescription,
      canonicalUrl,
      featureImage,
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard,
      tags,
      categories,
      faq,
      internalLinks,
      externalLinks,
      status,
    } = req.body;

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const blog = await Blog.create({
      title,
      slug,
      content,
      metaTitle,
      metaDescription,
      canonicalUrl,
      featureImage,
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard,
      tags,
      categories,
      faq,
      internalLinks,
      externalLinks,
      status,
      author: req.user._id,
    });

    res.status(201).json({
      message: "Blog Created Successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBlogs = async (req, res) => {

    try {

        let blogs;

        if (req.user.role === "author") {

            blogs = await Blog.find({
                author: req.user._id
            })
            .populate("author", "name email role")
            .sort({
                createdAt: -1
            });

        } else {

            blogs = await Blog.find()
            .populate("author", "name email role")
            .sort({
                createdAt: -1
            });

        }

        res.status(200).json({

            count: blogs.length,

            blogs,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    }).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPublishedBlogs = async (req, res) => {

    try {

        const blogs = await Blog.find({
            status: "published",
        })
        .populate("author", "name")
        .sort({
            createdAt: -1,
        });

        res.status(200).json({
            count: blogs.length,
            blogs,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Author can only edit their own blog
    if (
      req.user.role === "author" &&
      blog.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only update your own blogs.",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      message: "Blog Updated Successfully",
      blog: updatedBlog,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Author can only delete their own blog
    if (
      req.user.role === "author" &&
      blog.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only delete your own blogs.",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Blog Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getPublishedBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};