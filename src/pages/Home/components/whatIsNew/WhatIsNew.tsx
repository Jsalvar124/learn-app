import styles from './WhatIsNew.module.css';
import { Box } from '../../../../components/common/Box';
import { Button } from '../../../../components/common/Button';
import img1 from '../../../../assets/box-img1-crop.png';
import img2 from '../../../../assets/box-img2-crop.png';
import img3 from '../../../../assets/box-img3-crop.png';

const ARTICLES = [
  {
    image: img1,
    imageAlt: 'Two people having a conversation on a couch',
    tag: 'Do consectetur',
    title: 'Aliqua Irure Tempor Lorem Occaecat Volup',
    date: new Date('2022-12-24'),
    minutesToRead: 5,
  },
  {
    image: img2,
    imageAlt: 'Hands typing on a laptop keyboard',
    tag: 'Consequat labore',
    title: 'Commodo Deserunt Ipsum Occaecat Qui',
    date: new Date('2022-12-12'),
    minutesToRead: 10,
  },
  {
    image: img3,
    imageAlt: 'Person presenting to a small group',
    tag: 'Laboris nulla',
    title: 'Deserunt Cccaecat Qui Amet Tempor Dolore',
    date: new Date('2022-11-20'),
    minutesToRead: 3,
  },
];

const WhatIsNew = () => (
  <section className={styles.container}>
    <div className={styles.header}>
      <h2 className={styles.title}>What's new?</h2>
      <p className={styles.subtitle}>
        Do consectetur proident proident id eiusmod deserunt
        consequat pariatur ad ex velit do Lorem reprehenderit.
      </p>
    </div>

    <div className={styles.grid}>
      {ARTICLES.map((article) => (
        <Box key={article.title} {...article} />
      ))}
    </div>

    <Button text="Read more articles" variant="prime" />
  </section>
);

export default WhatIsNew;