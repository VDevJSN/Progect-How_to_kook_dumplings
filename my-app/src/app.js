import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const onTheFirstStep = activeIndex === 0; // boolean
	const onTheLastStep = activeIndex === data.length - 1; //boolean

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const onTheBackButton = () => {
		setActiveIndex(activeIndex - 1);
	};

	const onTheForwardButton = () => {
		if (onTheLastStep) {
			setActiveIndex(0);
		} else {
			setActiveIndex(activeIndex + 1);
		}
	};

	const onClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{/* Контент соответственный шагу. Сейчас активен шаг 3 */}
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{data.map(({ id, title, content }, index) => (
							<li
								className={
									activeIndex > index
										? styles['steps-item'] + ' ' + styles.done
										: styles['steps-item'] && activeIndex === index
											? styles['steps-item'] +
												' ' +
												styles.done +
												' ' +
												styles.active
											: styles['steps-item']
								}
								key={id}
							>
								<button
									className={styles['steps-item-button']}
									onClick={(e) => onClick(index)}
								>
									{index + 1}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onTheBackButton}
							disabled={onTheFirstStep}
						>
							Назад
						</button>
						<button className={styles.button} onClick={onTheForwardButton}>
							{onTheLastStep ? 'Начать сначала' : 'Далее'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
