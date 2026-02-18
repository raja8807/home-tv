import React from "react";
import styles from "./footer.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Image, Row } from "react-bootstrap";
import SocialMedia from "@/components/common/social_media/social_media";
import Link from "next/link";
import {
  EnvelopeAtFill,
  GeoAltFill,
  TelephoneFill,
} from "react-bootstrap-icons";
import { CONATCT_DETAILS } from "@/constants/constants";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <CustomContainer>
        <div className={styles.top}>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <div className={`${styles.footerSection} ${styles.brand}`}>
                <Image src="/logo/logo.png" width={200} alt="logo" />
                <br />
                <br />
                <SocialMedia />
              </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div className={`${styles.footerSection} ${styles.link}`}>
                <Link href={"/"}>HOME</Link>
                <Link href={"/contact"}>CONTACT US</Link>
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div className={`${styles.footerSection} ${styles.contact}`}>
                <div>
                  <GeoAltFill /> {CONATCT_DETAILS.address}
                </div>
                {/* <div>
                  <TelephoneFill /> 9500023724 / 9710649567
                </div> */}
                <div>
                  <EnvelopeAtFill />{" "}
                  <Link href={`mailto:${CONATCT_DETAILS.email}`}>
                    {CONATCT_DETAILS.email}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.bot}>
          <p>© Nexus7. All Rights Reserved. Licensing</p>
        </div>
      </CustomContainer>
    </footer>
  );
};

export default Footer;
