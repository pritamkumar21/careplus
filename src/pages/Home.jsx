function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div>
        <h2>User not found. Please log in.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome, {user.name} 👋</h1>
      <h2>Home file....</h2>
    </div>
  );
}

export default Home;
