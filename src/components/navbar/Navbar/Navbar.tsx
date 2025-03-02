import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {
	return (
		<nav className={styles.navBar}>
			<div className={styles.navContainer}>
				<Link to="/" className={styles.homeLink}>
					Home
				</Link>
				<div className={styles.rightHandLinks}>
					<Link to="/imagesets" className={styles.imageSetsLink}>
						Image Sets
					</Link>
					<Link to="/collages" className={styles.collagesLink}>
						Collages
					</Link>
				</div>
			</div>
		</nav>
	);
};
