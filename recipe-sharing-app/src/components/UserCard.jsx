// src/components/UserCard.jsx
const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <img src={user.avatar_url} alt={user.login} width="100" />
      <h2>{user.login}</h2>
      <p>{user.bio ? user.bio : "No bio available"}</p>
      <a href={user.html_url} target="_blank" rel="noreferrer">
        View Profile
      </a>
    </div>
  );
};

export default UserCard;

