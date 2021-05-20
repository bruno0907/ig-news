import styles from './styles.module.scss'

interface SubscribeButtonProps{
  priceId: string;
}

function SubscribeButton({ priceId }: SubscribeButtonProps){
  return(
    <button className={styles.subscribeButton}>Subscribe now</button>
  )
}

export { SubscribeButton }