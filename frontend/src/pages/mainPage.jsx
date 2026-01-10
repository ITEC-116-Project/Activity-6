import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import AuthPage from '../components/LoginModal';

const MainPage = () => {
  const { user, logout, isAdmin } = useAuth();

  // If user is not logged in, show login modal
  if (!user) {
    return <AuthPage />;
  }
  const Star = ({ size = 20, filled = false, onClick, style }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      style={style}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  // Custom Plus Icon Component
  const Plus = ({ size = 20 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  // Custom X Icon Component
  const X = ({ size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  // Custom Pencil/Edit Icon Component
  const Pencil = ({ size = 20 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L21 3z" />
    </svg>
  );

  // Custom Trash Icon Component
  const Trash = ({ size = 20 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );

  // Custom Logout Icon Component
  const LogoutIcon = ({ size = 20 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  const getReviewerInitial = () => {
    if (user?.name?.trim()) {
      return user.name.trim().charAt(0).toUpperCase();
    }
    if (user?.email?.trim()) {
      return user.email.trim().charAt(0).toUpperCase();
    }
    return 'U';
  };

  const [movies, setMovies] = useState(() => {
    const defaultMovies = [
      {
        id: 1,
        title: "Bad Boys For Life",
        poster: "bb.jpg",
        description: "Detectives Mike Lowrey and Marcus Burnett reunite when a dangerous crime lord targets Mike’s past. As they face new enemies, they must work together one last time to stop a deadly threat.",
        genres: ["Action", "Comedy", "Crime", "Thriller"],
        casts: ["Will Smith", "Martin Lawrence", "Joe Pantoliano"],
        releaseDate: "January 17, 2020",
        duration: "124 minutes",
        reviews: [
          { id: 1, user: "John Doe", rating: 5, comment: "Absolutely masterpiece! One of the best films ever made." },
          { id: 2, user: "Jane Smith", rating: 5, comment: "Incredible storytelling and acting." }
        ]
      },
      {
        id: 2,
        title: "Five Nights at Freddy's",
        poster: "fnf.jpg",
        description: "A troubled security guard takes a night shift at an abandoned family entertainment center, only to discover that the animatronic mascots come alive after dark with deadly intentions.",
        genres: ["Horror", "Mystery", "Thriller"],
        casts: ["Josh Hutcherson", "Elizabeth Lail", "Piper Rubio"],
        releaseDate: "October 27, 2023",
        duration: "1 hour 50 minutes",
        reviews: [
          { id: 1, user: "Mike Johnson", rating: 4, comment: "Mind-bending and visually stunning." }
        ]
      },
      {
        id: 3,
        title: "Stranger Things",
        poster: "st.jpg",
        description: "When a young boy mysteriously disappears, a small town uncovers secret experiments, supernatural forces, and a strange girl with powerful abilities connected to another dimension called the Upside Down.",
        genres: ["Science Fiction", "Horror", "Drama"],
        casts: ["Millie Bobby Brown", "Finn Wolfhard", "Noah Schnapp"],
        releaseDate: "July 15, 2016",
        duration: "Episodes range from ~45 minutes",
        reviews: [
          { id: 1, user: "Sarah Williams", rating: 5, comment: "Best superhero film ever made!" },
          { id: 2, user: "Tom Brown", rating: 4, comment: "Amazing performance by Heath Ledger." }
        ]
      },
      {
        id: 4,
        title: "Extraction",
        poster: "extraction-1.jpeg",
        description: "A black ops extraction specialist is assigned a mission to retrieve a kidnapped son of an imprisoned international crime lord.",
        genres: ["Action", "Thriller"],
        casts: ["Chris Hemsworth", "Randeep Hooda", "Golshifteh Farahani"],
        releaseDate: "April 24, 2020",
        duration: "116 minutes",
        reviews: [
          { id: 1, user: "Emma Davis", rating: 5, comment: "A masterpiece of modern cinema." }
        ]
      },
      {
        id: 5,
        title: "Squid Game 3",
        poster: "sq.jpg",
        description: "When a young boy disappears, his friends, family and local police uncover a mystery involving secret government experiments and terrifying supernatural forces.",
        genres: ["Drama", "Fantasy", "Horror"],
        casts: ["Winona Ryder", "David Harbour", "Finn Wolfhard"],
        releaseDate: "July 15, 2016",
        duration: "50 minutes per episode",
        reviews: [
          { id: 1, user: "Chris Anderson", rating: 4, comment: "Revolutionary sci-fi film." },
          { id: 2, user: "Lisa Johnson", rating: 5, comment: "Mind-blowing special effects!" }
        ]
      },
      {
        id: 6,
        title: "Warcraft",
        poster: "war.jpg",
        description: "A troubled security guard begins working at Freddy Fazbear's Pizza. During his nightshift, he realizes the animatronic animals are coming to life.",
        genres: ["Horror", "Thriller"],
        casts: ["Josh Hutcherson", "Matthew Lillard", "Piper Rubio"],
        releaseDate: "October 27, 2023",
        duration: "109 minutes",
        reviews: [
          { id: 1, user: "Robert Wilson", rating: 5, comment: "Heartwarming and inspiring." }
        ]
      },
      
    ];

    const savedMovies = localStorage.getItem('movieReviews');
    if (savedMovies) {
      try {
        const parsedMovies = JSON.parse(savedMovies);
        // Merge saved movies with default movie data
        const mergedMovies = defaultMovies.map(defaultMovie => {
          const savedMovie = parsedMovies.find(m => m.id === defaultMovie.id);
          if (savedMovie) {
            // Deep merge: use saved values but keep default values for missing fields
            return {
              ...defaultMovie,
              ...savedMovie,
              reviews: savedMovie.reviews || defaultMovie.reviews || []
            };
          }
          return defaultMovie;
        });

        // Add any custom movies that don't match default movies
        const customMovies = parsedMovies.filter(
          saved => !defaultMovies.find(def => def.id === saved.id)
        );

        return [...mergedMovies, ...customMovies];
      } catch (error) {
        console.error('Error loading saved movies:', error);
        return defaultMovies;
      }
    }
    return defaultMovies;
  });

  const [showAddMovie, setShowAddMovie] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [showEditMovie, setShowEditMovie] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({ title: '', poster: '' });
  const [editMovie, setEditMovie] = useState({ title: '', poster: '' });
  const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });

  useEffect(() => {
    localStorage.setItem('movieReviews', JSON.stringify(movies));
  }, [movies]);

  const handlePosterFileChange = (e, isEditMode = false) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditMode) {
          setEditMovie({ ...editMovie, poster: reader.result });
        } else {
          setNewMovie({ ...newMovie, poster: reader.result });
        }
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File Type',
        text: 'Please select a JPG or JPEG image file',
        confirmButtonColor: '#0ea5e9'
      });
    }
  };

  const movieGalleries = {
    1: [
      "/assets/movie1-1.jpg",
      "/assets/movie1-2.jpg",
      "/assets/movie1-3.jpg",
      "/assets/movie1-4.jpg"
    ],
    2: [
      "/assets/movie2-1.jpg",
      "/assets/movie2-2.jpg",
      "/assets/movie2-3.jpg",
      "/assets/movie2-4.jpg"
    ],
    3: [
      "/assets/movie3-1.jpg",
      "/assets/movie3-2.jpg",
      "/assets/movie3-3.jpg",
      "/assets/movie3-4.jpg"
    ],
    4: [
      "/assets/movie4-1.jpg",
      "/assets/movie4-2.jpg",
      "/assets/movie4-3.jpg",
      "/assets/movie4-4.jpg"
    ],
    5: [
      "/assets/movie5-1.jpg",
      "/assets/movie5-2.jpg",
      "/assets/movie5-3.jpg",
      "/assets/movie5-4.jpg"
    ],
    6: [
      "/assets/movie6-1.jpg",
      "/assets/movie6-2.jpg",
      "/assets/movie6-3.jpg",
      "/assets/movie6-4.jpg"
    ]
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleAddMovie = () => {
    if (!newMovie.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Title',
        text: 'Please enter a movie title',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }
    if (!newMovie.poster) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Poster',
        text: 'Please select a poster image',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }
    setMovies([...movies, {
      id: Date.now(),
      title: newMovie.title,
      poster: newMovie.poster,
      reviews: []
    }]);
    setNewMovie({ title: '', poster: '' });
    setShowAddMovie(false);
    
    // Success notification
    Swal.fire({
      icon: 'success',
      title: 'Movie Added',
      text: 'Your movie has been added successfully!',
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: '#0ea5e9'
    });
  };

  const handleEditMovie = () => {
    if (!editMovie.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Title',
        text: 'Please enter a movie title',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }
    if (editMovie.title.trim() === selectedMovie.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'No Changes',
        text: 'Please enter a different title for the movie',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }
    if (!editMovie.poster) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Poster',
        text: 'Please select a poster image',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }
    if (selectedMovie) {
      const updatedMovies = movies.map(movie => {
        if (movie.id === selectedMovie.id) {
          return {
            ...movie,
            title: editMovie.title,
            poster: editMovie.poster
          };
        }
        return movie;
      });
      setMovies(updatedMovies);
      setEditMovie({ title: '', poster: '' });
      setShowEditMovie(false);
      setSelectedMovie(null);
      
      // Success notification
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Movie updated successfully!',
        timer: 1500,
        showConfirmButton: false,
        confirmButtonColor: '#0ea5e9'
      });
    }
  };

  const handleAddReview = () => {
    if (!newReview.comment.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Comment',
        text: 'Please write a review comment',
        confirmButtonColor: '#0ea5e9'
      });
      return;
    }
    const updatedMovies = movies.map(movie => {
      if (movie.id === selectedMovie.id) {
        return {
          ...movie,
          reviews: [...movie.reviews, { ...newReview, user: getReviewerInitial(), id: Date.now() }]
        };
      }
      return movie;
    });
    setMovies(updatedMovies);
    setNewReview({ user: '', rating: 5, comment: '' });
    setShowReviewModal(false);
    setSelectedMovie(null);
    
    Swal.fire({
      icon: 'success',
      title: 'Review Added',
      text: 'Your review has been added successfully!',
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: '#0ea5e9'
    });
  };

  const handleDeleteMovie = (movieToDelete) => {
    Swal.fire({
      icon: 'warning',
      title: 'Delete this movie?',
      text: `"${movieToDelete.title}" and its reviews will be removed.`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        setMovies(prev => prev.filter(movie => movie.id !== movieToDelete.id));

        if (selectedMovie && selectedMovie.id === movieToDelete.id) {
          setSelectedMovie(null);
          setShowEditMovie(false);
          setShowReviewModal(false);
          setShowGallery(false);
        }

        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Movie removed successfully.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const StarRating = ({ rating, onRate, interactive = false }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 28 : 20}
            filled={star <= rating}
            onClick={() => interactive && onRate(star)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <h1>🎬 Movie Reviews</h1>
          {isAdmin() && (
            <button className="btn-primary" onClick={() => setShowAddMovie(true)}>
              <Plus size={20} /> Add Movie
            </button>
          )}
        </div>
      </header>

      <div className="user-dropdown-wrapper">
        <button 
          className="user-avatar-btn"
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          title={user.name}
        >
          {user.name.charAt(0).toUpperCase()}
        </button>
        {showUserDropdown && (
          <div className="user-dropdown-menu">
            <div className="dropdown-header">
              <p className="current-user">Logged in as:</p>
              <p className="user-name-dropdown">{user.name}</p>
            </div>
            <div className="dropdown-divider"></div>
            <button 
              className="dropdown-item logout-item"
              onClick={() => {
                Swal.fire({
                  icon: 'warning',
                  title: 'Logout?',
                  text: 'Are you sure you want to logout?',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, logout',
                  cancelButtonText: 'Cancel',
                  confirmButtonColor: '#dc2626',
                  cancelButtonColor: '#6b7280'
                }).then((result) => {
                  if (result.isConfirmed) {
                    logout();
                    setShowUserDropdown(false);
                  }
                });
              }}
            >
              <LogoutIcon size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      <div className="movies-grid">
        {movies.map((movie) => {
          const avgRating = calculateAverageRating(movie.reviews);
          return (
            <div key={movie.id} className="movie-card">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="movie-poster"
                onClick={() => {
                  setSelectedMovie(movie);
                  setShowMovieDetails(true);
                }}
                style={{ cursor: 'pointer' }}
              />
              <div className="movie-content">
                <div className="movie-header">
                  <h2 className="movie-title">{movie.title}</h2>
                  {isAdmin() && (
                    <div className="movie-actions">
                      <button 
                        className="edit-movie-btn"
                        onClick={() => {
                          setSelectedMovie(movie);
                          setEditMovie({ title: movie.title, poster: movie.poster });
                          setShowEditMovie(true);
                        }}
                        title="Edit movie"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        className="delete-movie-btn"
                        onClick={() => handleDeleteMovie(movie)}
                        title="Delete movie"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="rating-section">
                  <StarRating rating={Math.round(avgRating)} />
                  <span className="avg-rating">{avgRating}/5</span>
                  <span className="review-count">({movie.reviews.length} reviews)</span>
                </div>
                {!isAdmin() && (
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setSelectedMovie(movie);
                      setShowReviewModal(true);
                    }}
                  >
                    Add Review
                  </button>
                )}
                
                <div className="reviews-list">
                  {movie.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-user-section">
                        <div className="user-avatar">{review.user.charAt(0).toUpperCase()}</div>
                        <div className="user-info">
                          <strong className="user-name">{review.user}</strong>
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showGallery && selectedMovie && (
        <div className="modal-overlay" onClick={() => setShowGallery(false)}>
          <div className="modal gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedMovie.title} - Gallery</h2>
              <button className="close-btn" onClick={() => setShowGallery(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body gallery-body">
              <div className="gallery-grid">
                {(movieGalleries[selectedMovie.id] || []).map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`${selectedMovie.title} ${index + 1}`}
                    className="gallery-image"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showMovieDetails && selectedMovie && (
        <div className="modal-overlay" onClick={() => setShowMovieDetails(false)}>
          <div className="modal details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedMovie.title}</h2>
              <button className="close-btn" onClick={() => setShowMovieDetails(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body details-body">
              <div className="details-grid">
                <div className="details-poster">
                  <img src={selectedMovie.poster} alt={selectedMovie.title} />
                </div>
                <div className="details-info">
                  <div className="detail-section">
                    <h3 className="detail-label">Description</h3>
                    <p className="detail-content">{selectedMovie.description || "No description available"}</p>
                  </div>

                  <div className="detail-section">
                    <h3 className="detail-label">Genres</h3>
                    <div className="genre-tags">
                      {(selectedMovie.genres || []).map((genre, index) => (
                        <span key={index} className="genre-tag">{genre}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3 className="detail-label">Cast</h3>
                    <p className="detail-content">{(selectedMovie.casts || []).join(", ") || "No cast information"}</p>
                  </div>

                  <div className="detail-row">
                    <div className="detail-section">
                      <h3 className="detail-label">Release Date</h3>
                      <p className="detail-content">{selectedMovie.releaseDate || "N/A"}</p>
                    </div>
                    <div className="detail-section">
                      <h3 className="detail-label">Duration</h3>
                      <p className="detail-content">{selectedMovie.duration || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditMovie && selectedMovie && (
        <div className="modal-overlay" onClick={() => setShowEditMovie(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Movie</h2>
              <button className="close-btn" onClick={() => setShowEditMovie(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Movie Title"
                value={editMovie.title}
                onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })}
                className="input-field"
              />
              <label className="file-input-label">
                <span className="file-input-button">Choose Poster Image (JPG/JPEG)</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg"
                  onChange={(e) => handlePosterFileChange(e, true)}
                  className="file-input"
                />
              </label>
              {editMovie.poster && (
                <div className="image-preview">
                  <img src={editMovie.poster} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                </div>
              )}
              <button className="btn-primary" onClick={handleEditMovie}>
                Update Movie
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddMovie && (
        <div className="modal-overlay" onClick={() => setShowAddMovie(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Movie</h2>
              <button className="close-btn" onClick={() => setShowAddMovie(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Movie Title"
                value={newMovie.title}
                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                className="input-field"
              />
              <label className="file-input-label">
                <span className="file-input-button">Choose Poster Image (JPG/JPEG)</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg"
                  onChange={(e) => handlePosterFileChange(e, false)}
                  className="file-input"
                />
              </label>
              {newMovie.poster && (
                <div className="image-preview">
                  <img src={newMovie.poster} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                </div>
              )}
              <button className="btn-primary" onClick={handleAddMovie}>
                Add Movie
              </button>
            </div>
          </div>
        </div>
      )}

      {showReviewModal && selectedMovie && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Review: {selectedMovie.title}</h2>
              <button className="close-btn" onClick={() => setShowReviewModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="user-info-section">
                <div className="user-badge-modal">{user.name.charAt(0).toUpperCase()}</div>
                <div>
                  <p className="info-label">Reviewing as:</p>
                  <p className="info-value">{user.name}</p>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Rate this movie</label>
                <div className="rating-selector">
                  <StarRating 
                    rating={newReview.rating} 
                    onRate={(rating) => setNewReview({ ...newReview, rating })}
                    interactive={true}
                  />
                  <span className="rating-text">{newReview.rating} out of 5 stars</span>
                </div>
                <p className="rating-hint">Click on the stars to rate</p>
              </div>

              <div className="form-group">
                <label className="form-label">Your Review</label>
                <textarea
                  placeholder="Share your thoughts about this movie..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="textarea-field"
                  rows="5"
                />
              </div>
              
              <button className="btn-primary" onClick={handleAddReview}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #051937 0%, #0f766e 100%);
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto 40px;
          padding: 24px 32px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          gap: 16px;
          position: relative;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-dropdown-wrapper {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 2000;
        }

        .user-avatar-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          font-weight: 700;
          font-size: 1.3rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar-btn:hover {
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
        }

        .user-dropdown-menu {
          position: absolute;
          top: 70px;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          min-width: 220px;
          z-index: 1000;
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .current-user {
          color: #6b7280;
          font-size: 0.85rem;
          margin: 0 0 4px 0;
          font-weight: 500;
        }

        .user-name-dropdown {
          color: #1a1a1a;
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .dropdown-divider {
          height: 1px;
          background: #e5e7eb;
        }

        .dropdown-item {
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #1a1a1a;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.2s ease;
          text-align: left;
          font-family: inherit;
        }

        .dropdown-item:hover {
          background: #f3f4f6;
        }

        .dropdown-item.logout-item:hover {
          background: #fee2e2;
          color: #dc2626;
        }

        .dropdown-item svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
        }

        .role-icon {
          font-size: 1.2rem;
          display: inline-block;
          width: 20px;
          text-align: center;
        }

        .header h1 {
          color: white;
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin: 0;
        }

        .header .btn-primary {
          position: absolute;
          right: 32px;
          width: auto;
          padding: 8px 16px;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          min-width: auto;
        }

        .header .btn-primary:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .movies-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
        }

        .movie-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .movie-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
        }

        .movie-poster {
          width: 100%;
          height: 350px;
          object-fit: cover;
        }

        .movie-content {
          padding: 24px;
        }

        .movie-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .movie-title {
          font-size: 1.5rem;
          color: #1a1a1a;
          font-weight: 700;
          margin: 0;
        }

        .movie-actions {
          display: flex;
          gap: 8px;
        }

        .edit-movie-btn {
          background: none;
          border: none;
          color: #0ea5e9;
          cursor: pointer;
          padding: 6px;
          transition: all 0.2s ease;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .edit-movie-btn:hover {
          background: rgba(14, 165, 233, 0.12);
          color: #0f766e;
          transform: scale(1.1);
        }

        .delete-movie-btn {
          background: none;
          border: none;
          color: #b91c1c;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .delete-movie-btn:hover {
          background: #f87171;
          color: white;
          transform: scale(1.1);
        }

        .rating-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .star-rating {
          display: flex;
          gap: 4px;
        }

        .star-rating svg {
          transition: all 0.2s ease;
          color: #d1d5db;
          stroke: #d1d5db;
        }

        .star-rating svg[fill="currentColor"] {
          color: #fbbf24;
          stroke: #fbbf24;
          fill: #fbbf24;
        }

        .star-rating svg:hover {
          transform: scale(1.1);
        }

        .star-filled {
          fill: #fbbf24;
          color: #fbbf24;
        }

        .star-empty {
          fill: none;
          color: #d1d5db;
        }

        .avg-rating {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .review-count {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
          justify-content: center;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.35);
        }

        .btn-secondary {
          background: white;
          color: #0ea5e9;
          border: 2px solid #0ea5e9;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          margin-bottom: 20px;
        }

        .btn-secondary:hover {
          background: #14b8a6;
          color: white;
        }

        .reviews-list {
          border-top: 2px solid #f3f4f6;
          padding-top: 20px;
          max-height: 300px;
          overflow-y: auto;
        }

        .review-item {
          background: #f9fafb;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #e5e7eb;
        }

        .review-user-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-name {
          color: #1a1a1a;
          font-size: 1rem;
          font-weight: 600;
        }

        .review-comment {
          color: #4b5563;
          line-height: 1.6;
          font-size: 0.95rem;
          margin-left: 52px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal {
          background: white;
          border-radius: 16px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
        }

        .gallery-modal {
          max-width: 900px;
        }

        .gallery-body {
          padding: 24px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .gallery-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .gallery-image:hover {
          transform: scale(1.05);
        }

        .details-modal {
          max-width: 1000px;
          max-height: 90vh;
        }

        .details-body {
          padding: 24px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 30px;
          align-items: start;
        }

        .details-poster {
          width: 100%;
        }

        .details-poster img {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .details-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0ea5e9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .detail-content {
          font-size: 0.95rem;
          color: #333;
          line-height: 1.6;
          margin: 0;
        }

        .genre-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .genre-tag {
          display: inline-block;
          padding: 6px 12px;
          background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
          color: white;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .detail-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .gallery-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-image:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 2px solid #f3f4f6;
        }

        .modal-header h2 {
          font-size: 1.5rem;
          color: #1a1a1a;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          transition: color 0.2s ease;
          padding: 4px;
        }

        .close-btn:hover {
          color: #1a1a1a;
        }

        .modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .user-info-section {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f0f9ff;
          border-radius: 8px;
          border: 2px solid #0ea5e9;
        }

        .user-badge-modal {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .info-label {
          color: #6b7280;
          font-size: 0.85rem;
          margin: 0;
          font-weight: 500;
        }

        .info-value {
          color: #1a1a1a;
          font-size: 1rem;
          font-weight: 600;
          margin: 4px 0 0 0;
        }

        .input-field,
        .textarea-field {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }

        .input-field:focus,
        .textarea-field:focus {
          outline: none;
          border-color: #0ea5e9;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 0.95rem;
        }

        .rating-selector {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
        }

        .rating-text {
          color: #0ea5e9;
          font-size: 1rem;
          font-weight: 600;
        }

        .rating-hint {
          color: #6b7280;
          font-size: 0.85rem;
          margin-top: 4px;
          font-style: italic;
        }

        .file-input {
          display: none;
        }

        .file-input-label {
          cursor: pointer;
          display: block;
        }

        .file-input-button {
          display: block;
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s ease;
          text-align: center;
        }

        .file-input-button:hover {
          opacity: 0.9;
        }

        .image-preview {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
        }

        @media (max-width: 768px) {
          .app-container {
            padding: 20px 10px;
          }

          .header {
            flex-direction: row;
            gap: 16px;
            padding: 20px;
            justify-content: flex-start;
          }

          .header-left {
            flex-direction: column;
            width: auto;
            flex: 1;
          }

          .header h1 {
            font-size: 2rem;
          }

          .user-dropdown-wrapper {
            position: fixed;
            top: 20px;
            right: 20px;
          }

          .user-dropdown-menu {
            right: 0;
            min-width: 200px;
          }

          .movies-grid {
            grid-template-columns: 1fr;
          }

          .rating-selector {
            flex-direction: column;
            align-items: flex-start;
          }

          .details-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .details-poster {
            width: 100%;
          }

          .detail-row {
            grid-template-columns: 1fr;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default MainPage;