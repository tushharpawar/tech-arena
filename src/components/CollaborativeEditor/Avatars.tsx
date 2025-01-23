"use client"
// import { useOthers, useSelf } from "@liveblocks/react/suspense";
import styles from "./Avatars.module.css";

export function Avatars() {
//   const users = useOthers();
//   const currentUser = useSelf();

  return (
    <div className={styles.avatars}>
      {/* {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })} */}

       (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture="https://res.cloudinary.com/tushharpawar/image/upload/v1721905572/profile_pic_q6ssck.jpg"
            name="Tushar"
          />
        </div>
      )
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
      />
    </div>
  );
}