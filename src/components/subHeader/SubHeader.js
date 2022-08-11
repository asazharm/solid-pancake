import React from 'react'
import c from './SubHeader.module.scss'


export default function Subheader() {
  return (
    <div className={c['subheader']}>
      <div className={`contact-item contact-item_location ${c['subheader__contact-item']}`}>Екатеринбург</div>
      <div className={`contact-item contact-item_tel ${c['subheader__contact-item']}`}>+7 (495) 506-36-50</div>
      <div className={`contact-item contact-item_mail ${c['subheader__contact-item']}`}>office@uconerfo.ru</div>
      <div className={`contact-item contact-item_application ${c['subheader__contact-item']}`}>Заявка на расчет</div>
      <div className={`contact-item contact-item_contacts ${c['subheader__contact-item']}`}>Контакты</div>
    </div>
  )
}