import React from 'react'
import c from './Banner.module.scss'


export default function Banner() {
  return (
    <div className={c['banner']}>
      <div className={c['banner__content']}>
        <div className={c['banner__content__title']}>Дозаторы и антисептики</div>
        <div className={c['banner__content__desc']}>Устанавливаются в общественных местах для предотвращения распространения вирусов микробов</div>
      </div>

      {/* <div > */}
        <button className={c[['banner__btn']]}>
          <div>
            <img src="images/arrow.svg" alt="" />
          </div>
          <p>Подробнее</p>
        </button>
      {/* </div> */}
      <div className={c['banner__img']}>
        <img src="images/banner_product.png" alt="product"/>
      </div>
    </div>
  )
}
