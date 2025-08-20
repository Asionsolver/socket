import MessageContainer from "./MessageContainer";
import UserSidebar from "./UserSidebar";

const Home = () => {
  return (
    <div className="flex">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
