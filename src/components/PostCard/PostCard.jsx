import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./PostCard.css";
import { deleteData } from "../../api/ClientFunction";
import { toast } from "react-toastify";
import { mutate } from "swr";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdatePostModal from "../CreatePostForm/UpdatePostModel";

const PostMeta = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-1 text-gray-500 text-sm">
    <Icon className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

const categoryImages = [
  {
    category: "React",
    image:
      "https://www.tatvasoft.com/blog/wp-content/uploads/2022/07/Why-Use-React-1280x720.jpg",
  },
  {
    category: "Tech",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZc2qhPEexG-Pg9op2n9lsRVfyyJ2PBVdDQ&s",
  },
  {
    category: "Entertainment",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZbS5Jaf5nJ-F9NVbKGkJwb-OM59DdzPgCyQ&s",
  },
  {
    category: "Movies",
    image:
      "https://www.wondermind.com/wp-content/uploads/2024/09/20-Feel-Good-Movies-People-Swear-By-For-Your-Next-Bad-Day.jpg?w=960",
  },
  {
    category: "Knowledge",
    image:
      "https://www.ispringsolutions.com/blog/wp-content/uploads/2023/04/Cover.jpg",
  },
  {
    category: "Health",
    image:
      "https://plus.unsplash.com/premium_photo-1672760403439-bf51a26c1ae6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWx0aGNhcmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    category: "Business",
    image:
      "https://gbs.klh.edu.in/assets/img/blog/business-management/business-education-importance.jpg",
  },
  {
    category: "Jobs",
    image:
      "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202210/paying-job-sixteen_nine.jpg?size=948:533",
  },
  {
    category: "Govt",
    image:
      "https://im.indiatimes.in/content/2024/Feb/government-jobs_65cc9831cd1cf.jpg?w=1200&h=900&cc=1&webp=1&q=75",
  },
];

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const showEditBtn = location.pathname === "/dashboard";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryData = categoryImages.find(
    (item) =>
      post.category &&
      post.category.trim().toLowerCase().includes(item.category.toLowerCase())
  );
  const imageUrl =
    categoryData?.image ||
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop";

  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      toast.promise(
        deleteData(`/posts/${postId}`).then((response) => {
          if (response?.success) {
            mutate("/posts");
            return response.message || "Post deleted successfully";
          } else {
            throw new Error(response?.message || "Failed to delete post");
          }
        }),
        {
          pending: "Deleting post...",
          success: (msg) => msg,
          error: (err) => err.message || "Something went wrong",
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col justify-between ">
        <div className="flex justify-between flex-wrap gap-4 mb-4 text-sm">
          <PostMeta icon={User} text={post.author?.name} />
          <PostMeta
            icon={Calendar}
            text={new Date(post.date).toLocaleDateString()}
          />
          {showEditBtn && (
            <div className="editbtn flex gap-3 text-lg">
              <button onClick={() => setIsModalOpen(true)}>
                <FaRegEdit />
              </button>
              <button onClick={() => handleDelete(post._id)}>
                <MdDelete />
              </button>
            </div>
          )}
        </div>
        <h3
          onClick={() => navigate(`/post/${post._id}`)}
          className="text-xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <button
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            Read More <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <UpdatePostModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={post}
        />
      </div>
    </div>
  );
};

export default PostCard;
