return (
  <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Accueil</Link>
        <div className="ms-auto">
          <Link className="btn btn-outline-primary me-2" to="/">Home</Link>
          <Link className="btn btn-primary" to="/catalogue">Catalogue</Link>
        </div>
      </div>
    </nav>

    <Routes>
      <Route
        path="/"
        element={
          !user ? (
            <Login onLogin={handleLogin} />
          ) : user?.role === "client" ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <HeroSection />
              <BestSellers />
              <Categories />
              <BestSellings />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route
        path="/accueil"
        element={
          user?.role === "client" ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <PageClient />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/preparateur"
        element={
          user?.role === "preparateur" ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <PagePreparateur />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/gerant"
        element={
          user?.role === "gerant" ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <PageGerant />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/catalogue"
        element={
          user ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <Catalogue />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/panier"
        element={
          user ? (
            <>
              <Header user={user} onLogout={handleLogout} />
              <Panier />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  </>
);
