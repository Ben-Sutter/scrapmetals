import React, { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const AboutPage = () => {
  const [bio, setBio] = useState(null);
  const [picUrl, setPicUrl] = useState("");

  /* ── Contentful fetch (unchanged) ────────────────────────── */
  useEffect(() => {
    const query = `
      {
        aboutContentCollection(limit: 1) {
          items {
            bio { json }
            picture { url }
          }
        }
      }
    `;

    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${
        import.meta.env.VITE_CMS_SPACE_ID
      }/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_CMS_API_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    )
      .then((r) => r.json())
      .then(({ data, errors }) => {
        if (errors) console.error(errors);
        const entry = data.aboutContentCollection.items[0];
        setBio(entry.bio.json);
        setPicUrl(entry.picture.url);
      });
  }, []);

  if (!bio)
    return (
      <div className="p-10 text-center text-xl text-white">Loading…</div>
    );

  const renderOptions = {
    renderText: (text) =>
      text.split("\n").reduce((acc, segment, i) => {
        if (i > 0) acc.push(<br key={i} />);
        acc.push(segment);
        return acc;
      }, []),
  };

  return (
    <section className="fixed inset-0 overflow-hidden">
      {/* global tweaks & custom font */}
      <style>{`
        html,body{margin:0;padding:0;}
        @font-face{
          font-family:'CustomFont';
          src:url('/fonts/CloisterBlack.ttf') format('truetype');
        }
        .font-gothic{font-family:'CustomFont',serif;}
      `}</style>

      {/* backdrop */}
      <img
        src="/images/redBG.jpg"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/80 via-black/60 to-black/40 backdrop-blur-md" />

      {/* -------------- MAIN LAYOUT -------------- */}
      <div
        className="
          flex h-full flex-col items-center justify-center
          p-0               /* no side-padding on mobile   */
          sm:px-4 sm:py-12  /* restore padding ≥640 px     */
        "
      >
        <div
          className="
            grid w-full h-full max-w-none               /* stretch on mobile   */
            sm:max-w-6xl                                /* cap width ≥640 px   */
            gap-10 bg-white/80 backdrop-blur-lg
            rounded-none sm:rounded-3xl                /* no round corners on mobile */
            p-6 sm:p-10                                 /* lighter padding on mobile  */
            md:grid-cols-2 shadow-none overflow-y-auto  /* scroll if content tall     */
          "
        >
          {/* text column */}
          <div className="prose prose-lg max-w-none text-black">
            <h1 className="mb-4 font-gothic text-5xl sm:text-6xl font-bold text-center md:text-left p-2">
              scrap&nbsp;metals
            </h1>
            {documentToReactComponents(bio, renderOptions)}
          </div>

          {/* portrait column */}
          <div className="flex items-center justify-center">
            <img
              src={picUrl}
              alt="Portrait"
              className="
                w-full h-auto
                max-w-none sm:max-w-sm   /* full width on mobile, fixed on larger */
                rounded-none sm:rounded-xl
              "
            />
          </div>
        </div>

        {/* Instagram footer */}
        <a
          href="https://www.instagram.com/scrap_metals_/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            inline-flex items-center gap-2 text-lg font-semibold
            text-white transition hover:text-pink-300
          "
        >
          {/* tiny insta glyph */}
          <svg viewBox="0 0 512 512" className="h-6 w-6 fill-current">
            <path
              d="M349.33 69.33H162.67A93.34 93.34 0 0 0 69.33 162.67v186.66A93.34 93.34 0 0 0 162.67 442h186.66A93.34 93.34 0 0 0 442 349.33V162.67A93.34 93.34 0 0 0 349.33 69.33zm-93.33 277a96 96 0 1 1 96-96 96 96 0 0 1-96 95.96ZM370.67 162a21.33 21.33 0 1 1 21.33-21.33A21.35 21.35 0 0 1 370.67 162Z"
            />
          </svg>
          @scrap_metals_
        </a>
      </div>
    </section>
  );
};

export default AboutPage;
