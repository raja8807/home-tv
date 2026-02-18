import React, { useState } from "react";
import { List } from "react-bootstrap-icons";
import styles from "./menu_button.module.scss";
import { Image, Offcanvas } from "react-bootstrap";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import CustomButton from "@/components/ui/custom_button/custom_button";

const MenuButton = ({ router }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClose = () => {
    setShowDrawer(false);
  };

  return (
    <div className={styles.MenuButton}>
      <List />
      <Offcanvas show={showDrawer} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Image src="/logo/logo.png" alt="logo" height={50} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={styles.body}>
            <nav>
              <ul>
                {PAGES.map((page) => {
                  return (
                    <li key={page.title}>
                      <Link
                        href={page.href}
                        onClick={handleClose}
                        className={
                          router.asPath === page.href ? styles.active : ""
                        }
                      >
                        {page.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <CustomButton onClick={handleClose}>Download Now</CustomButton>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default MenuButton;
