"use client";

import { useEffect, useState } from "react";

import { parseM3U } from "@/lib/parseM3U";
import VideoPlayer from "@/components/VideoPlayer";
import { supabase } from "@/lib/supabase";
import { Image } from "react-bootstrap";
import { CHANNELS } from "@/constants/constants";

export default function TvScreen() {
  const [selected, setSelected] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    async function getInitial() {
      const { data } = await supabase
        .from("tv_channel")
        .select("*")
        .eq("id", 1)
        .single();

      setSelected(data);
    }

    getInitial();

    const subscription = supabase
      .channel("tv-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "tv_channel",
          filter: "id=eq.1",
        },
        (payload) => {
          const updated = payload.new;
          setSelected(updated);
          setIsFullScreen(updated.fullscreen);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      {selected && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <VideoPlayer url={selected.url} isFullScreen={isFullScreen} />
          <h3>{selected.name}</h3>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {CHANNELS.map((channel, index) => (
          <button
            key={index}
            onClick={() => setSelected(channel)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {/* <br />
            <Image src={channel.logoUrl} width={50} alt={channel.name} />
            <br />
            <br /> */}
            {channel.name}
          </button>
        ))}
      </div>
    </main>
  );
}
