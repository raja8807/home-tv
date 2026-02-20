import { useEffect, useState } from "react";
import { parseM3U } from "@/lib/parseM3U";
import { Col, Row, Container, Image } from "react-bootstrap";
import { supabase } from "@/lib/supabase";
import { CHANNELS } from "@/constants/constants";

export default function Remote() {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    async function getCurrentChannel() {
      const { data } = await supabase
        .from("tv_channel")
        .select("*")
        .eq("id", 1)
        .single();

      setCurrentChannel(data);
    }

    getCurrentChannel();

    // 🔴 Realtime listener
    const subscription = supabase
      .channel("tv-channel-remote")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "tv_channel",
          filter: "id=eq.1",
        },
        (payload) => {
          setCurrentChannel(payload.new);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const changeChannel = async (channel) => {
    await supabase
      .from("tv_channel")
      .update({
        name: channel.name,
        url: channel.url,
      })
      .eq("id", 1);
  };

  const toggleFullscreen = async () => {
    await supabase
      .from("tv_channel")
      .update({
        fullscreen: !currentChannel?.fullscreen,
      })
      .eq("id", 1);
  };

  return (
    <Container style={{ padding: 20 }}>
      {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={toggleFullscreen}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            background: "#007bff",
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
        >
          {currentChannel?.fullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
        </button>
      </div> */}

      {/* 🔴 NOW PLAYING SECTION */}
      {currentChannel?.name && (
        <div
          style={{
            background: "#111",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <strong>Now Playing</strong>
          <div style={{ fontSize: "18px", marginTop: "5px" }}>
            {currentChannel.name}
          </div>
        </div>
      )}

      <Row>
        {CHANNELS.map((ch, i) => {
          const isActive = ch.name === currentChannel?.name;

          return (
            <Col
              key={i}
              xs={6}
              md={4}
              lg={3}
              style={{
                marginBottom: "20px",
              }}
            >
              <button
                onClick={() => changeChannel(ch)}
                style={{
                  display: "block",
                  //   margin: "6px 0",
                  padding: "12px",
                  width: "100%",
                  borderRadius: "8px",
                  border: isActive ? "2px solid #28a745" : "1px solid #ccc",
                  background: isActive ? "#d4edda" : "white",
                  fontWeight: isActive ? "bold" : "normal",
                  height: "100%",
                }}
              >
                <br />
                <Image src={ch.logoUrl} width={50} alt={ch.name} />
                <br />
                <br />
                {ch.name}
              </button>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
