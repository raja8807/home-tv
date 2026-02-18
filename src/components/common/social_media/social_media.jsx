import React from "react";
import styles from "./social_media.module.scss";
import { Facebook, Instagram, TwitterX, Youtube } from "react-bootstrap-icons";
import Link from "next/link";

const SocialMedia = () => {
  const socialMedia = [
    {
      id: "fb",
      href: "/",
      icon: <Facebook />,
    },
    {
      id: "insta",
      href: "/",
      icon: <Instagram />,
    },
    {
      id: "yt",
      href: "/",
      icon: <Youtube />,
    },
    {
      id: "x",
      href: "/",
      icon: <TwitterX />,
    },
  ];

  return (
    <div className={styles.SocialMedia}>
      {socialMedia.map((soc) => (
        <Link href={soc.href} key={soc.id} className={styles.item}>
          {soc.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
