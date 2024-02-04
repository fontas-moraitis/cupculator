import style from './SpinLoader.module.css';

const SpinLoader = () => {
    return (
        <div className={style.spinnerContainer}>
            <div className={style.spinner}>
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index}></div>
                ))}
            </div>
        </div>
    )
};

export default SpinLoader;