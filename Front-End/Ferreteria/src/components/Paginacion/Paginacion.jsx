import styles from './Paginacion.module.css'



export default function Paginacion({ totalPaginas, pagina, handler }) {

  const numeros = [...Array(totalPaginas)].map((_, index) => index + 1)

  return (
    <article>
      {numeros.map((item) => (
        <button
          key={item}
          onClick={() => handler(item)}
          style={{
            background: 'white',
            boxShadow: pagina === item ? 'orange 0px 0px 9px 2px' : '0 0 0 1px #78787a',
            margin: '5px',
          }}
          className={styles.buttons}
        >
          {item}
        </button>
      ))}
    </article>
  )
}