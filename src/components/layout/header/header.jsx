import React from "react";
import styles from "./header.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Link from "next/link";
import { useRouter } from "next/router";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { Image } from "react-bootstrap";
import MenuButton from "./menu_button/menu_button";
import { PAGES } from "@/constants/constants";

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.Header}>
      <CustomContainer>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <Link href="/" data-aos="fade-right">
              <Image src="/logo/logo.png" alt="logo" height={60} />
            </Link>

            <nav>
              <ul>
                {PAGES.map((page) => {
                  return (
                    <li key={page.title}>
                      <Link
                        href={page.href}
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
          </div>
          <div data-aos="fade-left" className={styles.cta}>
            <CustomButton href={"/contact"}>Download Now</CustomButton>
          </div>
          <MenuButton router={router} />
        </div>
      </CustomContainer>
    </header>
  );
};

export default Header;
