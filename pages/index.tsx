import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

interface RSVPForm {
  name: string;
  email: string;
  phone: string;
  guests: number;
  attending: boolean;
}

export default function Home() {
  const [formData, setFormData] = useState<RSVPForm>({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    attending: true,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'attending') {
      setFormData(prev => ({
        ...prev,
        attending: value === 'true'
      }));
    } else if (name === 'guests') {
      setFormData(prev => ({
        ...prev,
        guests: parseInt(value) || 1
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('RSVP мәліметтері:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: 1,
        attending: true,
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      {/* Тақырыпты бөлік */}
      <div className={styles.hero}>
        <h1 className={styles.title}>Бексеит & Жансай</h1>
        <p className={styles.subtitle}>Беташар той</p>
        <div className={styles.decorLine}></div>
      </div>

      {/* Ақпарат бөлігі */}
      <section className={styles.info}>
        <div className={styles.infoCard}>
          <h2>📅 Күні</h2>
          <p className={styles.highlight}>5 Шілде, 2026</p>
          <p>11:00 - Сағаты</p>
        </div>

        <div className={styles.infoCard}>
          <h2>📍 Орны</h2>
          <p className={styles.highlight}>Кемел 2/1</p>
          <p>Қонақтарды күте отырыпты</p>
        </div>
      </section>

      {/* RSVP Форма */}
      <section className={styles.rsvpSection}>
        <h2 className={styles.rsvpTitle}>Өз жағдайыңызды хабарлаңыз</h2>
        {submitted ? (
          <div className={styles.successMessage}>
            <p>✓ Рахмет! Сіздің өтінішіңіз қабылданды.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Атыңыз *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Атыңызды енгізіңіз"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Телефон *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="guests">Қонақтар саны</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              >
                <option value="1">1 адам</option>
                <option value="2">2 адам</option>
                <option value="3">3 адам</option>
                <option value="4">4 адам</option>
                <option value="5">5+ адам</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="attending">Келе аласызба? *</label>
              <select
                id="attending"
                name="attending"
                value={formData.attending.toString()}
                onChange={handleChange}
              >
                <option value="true">Иә, келемін ✓</option>
                <option value="false">Жоқ, келе алмаймын ✗</option>
              </select>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Хабарлау
            </button>
          </form>
        )}
      </section>

      {/* Төмендегі бөлік */}
      <footer className={styles.footer}>
        <p>💕 Сіздердің қатысуыңыздың құндылығын сүйінші күнінде қалайтын болмыз 💕</p>
      </footer>
    </div>
  );
}
