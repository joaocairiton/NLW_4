import styles from "../styles/components/Profile.module.css";

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://assets.change.org/photos/8/rs/wx/ldRSwXeXPMCOQUE-800x450-noPad.jpg?1563944095"
        alt=""
      />
      <div className="">
        <strong>joao Frango</strong>
        <p>
            <img src="icons/level.svg"/>
            Level 01
            </p>
      </div>
    </div>
  );
}
