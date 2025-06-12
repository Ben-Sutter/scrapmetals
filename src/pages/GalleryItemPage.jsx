import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GalleryItemPage = () => {
  const { title } = useParams();
  const [item, setItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const query = `
      {
        galleryItemCollection(where: { title: "${title}" }, limit: 1) {
          items {
            title
            picture { url }
            description
            dimensions
            medium
            price
            year
          }
        }
      }
    `;
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CMS_SPACE_ID}/`,
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
        setItem(data.galleryItemCollection.items[0]);
      });
  }, [title]);

  if (!item)
    return (
      <div className="flex h-screen items-center justify-center text-xl text-white">
        Loading…
      </div>
    );

  const specs = [
    { label: "Size", value: item.dimensions },
    { label: "Medium", value: item.medium },
    { label: "Year", value: item.year },
  ].filter((s) => s.value);

  const isGift = /^gift$/i.test(item.price);

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[length:200%]"
      style={{ backgroundImage: `url(${item.picture.url})` }}
    >
      <div className="absolute inset-0 -z-10 bg-black/80 backdrop-blur-sm" />

      <div className="flex h-screen w-full items-center justify-center p-0 sm:p-4">
        <div className="flex h-[90vh] w-full max-w-none sm:max-w-7xl flex-col md:flex-row overflow-hidden rounded-none sm:rounded-3xl bg-white/10 backdrop-blur-lg ring-0 shadow-none">
          {/* Image Section */}
          <div
            className="h-1/2 w-full overflow-hidden md:h-full md:w-3/5 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={item.picture.url}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="flex w-full flex-col justify-between overflow-hidden bg-black/50 p-6 sm:p-8 md:w-2/5">
            <Link
              to="/gallery"
              className="mb-4 inline-flex items-center text-sm text-white hover:text-gray-300"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to gallery
            </Link>

            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                {item.title}
              </h1>
              {item.price && (
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium text-cyan-50 ${
                    isGift ? "bg-[#660033]" : "bg-emerald-600/90"
                  }`}
                >
                  {isGift ? "Gift" : item.price}
                </span>
              )}
            </div>

            {specs.length > 0 && (
              <dl className="grid grid-cols-[max-content_1fr] gap-y-2 text-sm text-gray-300">
                {specs.map(({ label, value }) => (
                  <React.Fragment key={label}>
                    <dt className="border-r border-gray-600 pr-2 font-semibold">
                      {label}
                    </dt>
                    <dd className="pl-2 text-gray-100">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            )}

            {item.description && (
              <div className="mt-6 grow overflow-auto prose prose-invert max-w-none text-gray-200">
                <p className="whitespace-pre-line">{item.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={item.picture.url}
            alt={item.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default GalleryItemPage;