import styles from './button.module.css';

interface buttonProps {
    size: 'small' | 'medium' | 'large';
    text: string;
    property: 'default' | 'confirm' | 'pressed' | 'disabled';
    onClick: () => void;

}
export default function Button({size, text, property, onClick}: buttonProps) {
    return(
        <div>
            <button 
                className={`${styles[size]} ${styles[property]}`} 
                onClick={onClick}>
                {text}
            </button>
        </div>
    );
}