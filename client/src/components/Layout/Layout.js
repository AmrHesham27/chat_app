import styles from "./Layout.module.css";

function Layout(props) {
  return (
    <div className={styles.container}>
      {props.children}
      <div className={styles.squareOne}></div>
      <div className={styles.squareTwo}></div>
    </div>
  );
}

export default Layout;
