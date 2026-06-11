import styles from './Box.module.css'

interface Box {
    image: string;
    imageAlt: string;
    tag: string; //Text above the title;
    title: string; //Title of content;
    date: Date;
    minutesToRead: number;
}

const Box = ({image, imageAlt, tag, title, date, minutesToRead}: Box) => (
    <div className={styles.container}>
        <img src={image} alt={imageAlt} />
        <div className={styles.content}>
            <p className={styles.tag}>{tag}</p>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.bottomLine}>
                <p className={styles.date}>
                    {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <span className={styles.badge}>{minutesToRead} mins read</span>
            </div>
        </div>
    </div>
);

export default Box;