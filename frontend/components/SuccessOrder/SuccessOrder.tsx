import { FC } from 'react'
import Image from 'next/image'
import styles from './SuccessOrder.module.css'

interface SuccessOrderProps {
  onReturnToHome(): void
}

export const SuccessOrder: FC<SuccessOrderProps> = ({ onReturnToHome }) => {
  return (
    <div className={styles.SuccessOrder}>
      <h1>La orden se ha creado con éxito</h1>
      <Image src='/check.svg' alt='Check' height={200} width={200} />
      <button className={styles.button} onClick={onReturnToHome}>
        Crear otra pizza
      </button>
    </div>
  )
}
