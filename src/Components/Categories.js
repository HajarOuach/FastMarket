import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const categoryData = [
  { title: 'Fruits & Légumes', img: '/images/category-thumb-1.jpg' },
  { title: 'Pains & Desserts', img: '/images/category-thumb-2.jpg' },
  { title: 'Boissons', img: '/images/category-thumb-3.webp' },
  { title: 'Produits ménagers', img: '/images/houseCleaning.webp' },
  { title: 'Viandes & Volailles', img: '/images/category-thumb-5.jpg' },
  { title: 'Bébé & Puériculture', img: '/images/bebe.jpeg' },
  { title: 'Produits laitiers & Œufs', img: '/images/category-thumb-7.jpg' },
  { title: 'Surgelés', img: '/images/surgele.jpeg' },
  { title: 'Snacks & Chips', img: '/images/snacks.jpeg' },
  { title: 'Céréales & Petits-déjeuners', img: '/images/cereals.jpeg' },
  { title: 'Hygiène & soins personnels', img: '/images/hygiene.jpeg' },
  { title: 'Bio & Santé', img: '/images/bio.jpeg' },
];

function Categories() {
  return (
    <section className="container py-5">
      <div className="section-header d-flex flex-wrap justify-content-between mb-5">
        <h2 className="section-title">Catégories</h2>
        <div className="d-flex align-items-center gap-2">
          <Link to="/catalogue" className="btn btn-warning">Voir tout</Link>
          <div className="swiper-buttons d-flex gap-1">
            <button className="swiper-prev category-carousel-prev btn btn-warning">❮</button>
            <button className="swiper-next category-carousel-next btn btn-warning">❯</button>
          </div>
        </div>
      </div>

      <div className="category-carousel">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={4}
          navigation={{
            prevEl: '.category-carousel-prev',
            nextEl: '.category-carousel-next'
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {categoryData.map((cat, idx) => (
            <SwiperSlide key={idx}>
              <Link
                to={`/produits?categorie=${encodeURIComponent(cat.title)}`}
                className="nav-link text-center"
              >
                <img
                  src={cat.img}
                  className="rounded-circle"
                  alt={cat.title}
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <h4 className="fs-6 mt-3 fw-normal category-title">{cat.title}</h4>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Categories;