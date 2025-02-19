import React from "react";
import img from '../../public/BannarIMg/undraw_career-development_f0n6.png'
import img1 from '../../public/BannarIMg/undraw_shared-workspace_1u82.png'
import img2 from '../../public/BannarIMg/undraw_specs_2nnl.png'

const blogs = [
  {
    id: 1,
    title: "What Are Micro Tasks? How to Earn Money Doing Micro Tasks?",
    description:
      "Micro-tasks provide the opportunity to earn money by completing small tasks...",
    date: "25 May 2024",
    image: img, // Replace with actual image URL
  },
  {
    id: 2,
    title: "Earn With Micro Jobs: Guide For Making Side Income",
    description:
      "Micro Jobs allow you to become an independent contractor by completing tasks...",
    date: "25 May 2024",
    image: img1, // Replace with actual image URL
  },
  {
    id: 3,
    title: "Get Paid to Take Surveys",
    description:
      "Using your opinions and turning them into an additional income stream...",
    date: "27 May 2024",
    image: img2, // Replace with actual image URL
  },
];

const BlogSection = () => {
  return (
    <div className=" p-8 md:p-16">
      <h2 className="text-center text-3xl font-bold  mb-4">
        Latest Blogs
      </h2>
      <p className="text-center  mb-8">
        Read Latest Blogs from Picoworkers
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className=" rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm  mb-2">{blog.date}</p>
              <h3 className="text-lg font-bold  mb-2">
                {blog.title}
              </h3>
              <p className=" text-sm mb-4">{blog.description}</p>
              <a
                href="https://www.youtube.com/"
                className="text-red-500 font-semibold text-sm hover:underline"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
