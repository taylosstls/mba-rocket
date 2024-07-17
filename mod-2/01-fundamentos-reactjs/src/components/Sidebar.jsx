import { Pencil } from "@phosphor-icons/react";

import styles from './Sidebar.module.css'
import { Avatar } from './Avatar';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src='https://unsplash.com/photos/dMUt0X3f59Q/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8ZGV2ZWxvcGVyfHB0fDB8fHx8MTcxMjczMDQ0N3ww&force=true&w=640' alt='' />

            <div className={styles.profile}>
                <Avatar src='https://github.com/taylosstls.png' profile />
                <strong>Gustavo Teixeira</strong>
                <span>Front-end Developer</span>
            </div>

            <footer>
                <a href='#'>
                    <Pencil size={20} />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}