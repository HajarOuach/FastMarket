import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// N’oublie pas d’installer Swiper si ce n’est pas déjà fait :
// npm install swiper

import 'swiper/css';
import 'swiper/css/navigation';

const categoryData = [
  { title: 'Fruits & Veges',   img: '/images/category-thumb-1.jpg' },
  { title: 'Breads & Sweets',  img: '/images/category-thumb-2.jpg' },
  { title: 'Fruits & Veges',   img: '/images/category-thumb-3.jpg' },
  { title: 'Beverages',        img: '/images/category-thumb-4.jpg' },
  { title: 'Meat Products',    img: '/images/category-thumb-5.jpg' },
  { title: 'Breads',           img: '/images/category-thumb-6.jpg' },
  { title: 'Fruits & Veges',   img: '/images/category-thumb-7.jpg' },
  { title: 'Breads & Sweets',  img: '/images/category-thumb-8.jpg' },
  // tu peux dupliquer/modifier à volonté
];

function Categories() {
  return (
    <section className="container py-5">
      {/* Entête de section */}
      <div className="section-header d-flex flex-wrap justify-content-between mb-5">
        <h2 className="section-title">Catégories</h2>
       <div className="d-flex align-items-center gap-2">
  <a href="#!" className="btn btn-warning ">
    Voir tout
  </a>
  <div className="swiper-buttons d-flex gap-1">
    <button className="swiper-prev category-carousel-prev btn btn-warning">
      ❮
    </button>
    <button className="swiper-next category-carousel-next btn btn-warning">
      ❯
    </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
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
            0:   { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {categoryData.map((cat, idx) => (
            <SwiperSlide key={idx}>
              <a href="/category" className="nav-link text-center">
                <img
                  src={cat.img}
                  className="rounded-circle"
                  alt={cat.title}
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <h4 className="fs-6 mt-3 fw-normal category-title">
                  {cat.title}
                </h4>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Categories;
