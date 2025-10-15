import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { postId } = useParams();
  return <h3>Displaying Blog Post #{postId}</h3>;
}
