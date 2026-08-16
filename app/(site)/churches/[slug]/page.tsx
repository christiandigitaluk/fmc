import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Mail, Phone, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getChurch, getChurches } from "@/lib/content";

export async function generateStaticParams() {
  const churches = await getChurches();
  return churches.map((church) => ({ slug: church.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const church = await getChurch(slug);
  if (!church) return { title: "Church not found" };
  return {
    title: church.name,
    description: church.description,
    alternates: { canonical: `/churches/${church.slug}` },
    openGraph: {
      type: "website",
      title: church.name,
      description: church.description,
      url: `/churches/${church.slug}`,
      images: church.image ? [{ url: church.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: church.name,
      description: church.description,
      images: church.image ? [church.image] : undefined,
    },
  };
}

export default async function ChurchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const church = await getChurch(slug);
  if (!church) notFound();

  const mapQuery = encodeURIComponent(`${church.address}, ${church.postcode}`);
  const bbox = [church.lng - 0.01, church.lat - 0.008, church.lng + 0.01, church.lat + 0.008].join("%2C");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    name: church.name,
    description: church.description,
    telephone: church.phone,
    email: church.email,
    image: church.image,
    address: {
      "@type": "PostalAddress",
      streetAddress: church.address,
      postalCode: church.postcode,
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: church.lat, longitude: church.lng },
    url: `https://www.forestcircuit.co.uk/churches/${church.slug}`,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <Image src={church.image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--overlay-ink)" }} />
        <div className="container-max relative flex h-full flex-col justify-end pb-8 text-cream-50">
          <p className="eyebrow mb-3 !text-cream-50">{church.area}</p>
          <h1 style={{ fontSize: "var(--text-h1)" }} className="max-w-2xl text-cream-50">
            {church.name}
          </h1>
        </div>
      </div>

      <div className="container-max grid gap-12 py-14 md:py-20 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="mb-8 text-lg text-[var(--text-body)]" style={{ fontSize: "var(--text-lead)" }}>
            {church.description}
          </p>

          {church.worshipping === false ? (
            <div className="mb-10 rounded-[10px] border-2 border-ink-900 bg-orange-100 p-5">
              <p className="font-semibold text-[var(--text-heading)]">
                This building is no longer a worshipping congregation.
              </p>
              <p className="mt-1 text-[var(--text-body)]">
                It&apos;s kept on purely as a community hub, available for hall hire below.
              </p>
            </div>
          ) : (
            <section aria-labelledby="service-times-heading" className="mb-10">
              <h2 id="service-times-heading" style={{ fontSize: "var(--text-h3)" }} className="mb-4">
                Service times
              </h2>
              <ul className="flex flex-col gap-3">
                {church.serviceTimes.map((service) => (
                  <li
                    key={`${service.day}-${service.time}`}
                    className="flex items-center gap-3 rounded-[10px] border border-line-200 bg-white p-4"
                  >
                    <Clock size={18} className="text-forest-600" aria-hidden="true" />
                    <span className="font-semibold text-[var(--text-heading)]">
                      {service.day}, {service.time}
                    </span>
                    <span className="text-[var(--text-body)]">&mdash; {service.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="facilities-heading" className="mb-10">
            <h2 id="facilities-heading" style={{ fontSize: "var(--text-h3)" }} className="mb-4">
              Facilities
            </h2>
            <ul className="flex flex-wrap gap-2">
              {church.facilities.map((facility) => (
                <li key={facility}>
                  <Badge tone="forest">
                    <Check size={12} className="mr-1 inline" aria-hidden="true" />
                    {facility}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="hall-hire-heading" className="mb-10 rounded-[10px] bg-forest-100 p-6">
            <h2 id="hall-hire-heading" style={{ fontSize: "var(--text-h3)" }} className="mb-3">
              Hall &amp; hire
            </h2>
            <p className="mb-4 text-[var(--text-body)]">{church.hallHireInfo}</p>
            <Button href={`/hall-hire?church=${church.slug}`} variant="primary">
              Enquire about hiring this space
            </Button>
          </section>

          <section aria-labelledby="map-heading">
            <h2 id="map-heading" style={{ fontSize: "var(--text-h3)" }} className="mb-4">
              Find us
            </h2>
            <div className="overflow-hidden rounded-[10px] border border-line-200">
              <iframe
                title={`Map showing the location of ${church.name}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${church.lat}%2C${church.lng}`}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-forest-600"
            >
              Get directions on Google Maps →
            </a>
          </section>
        </div>

        <aside aria-label="Church details" className="h-fit rounded-[10px] border border-line-200 bg-white p-6 shadow-[var(--shadow-card)]">
          {church.minister && (
            <div className="mb-5">
              <p className="eyebrow mb-1">Minister</p>
              <p className="font-semibold text-[var(--text-heading)]">{church.minister}</p>
            </div>
          )}
          <div className="mb-5">
            <p className="eyebrow mb-1">Address</p>
            <p className="flex items-start gap-2 text-[var(--text-body)]">
              <MapPin size={16} className="mt-1 shrink-0 text-forest-600" aria-hidden="true" />
              <span>
                {church.address}
                <br />
                {church.postcode}
              </span>
            </p>
          </div>
          {church.phone && (
            <div className="mb-5">
              <p className="eyebrow mb-1">Phone</p>
              <a href={`tel:${church.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 font-semibold text-forest-600">
                <Phone size={16} aria-hidden="true" />
                {church.phone}
              </a>
            </div>
          )}
          {church.email && (
            <div className="mb-6">
              <p className="eyebrow mb-1">Email</p>
              <a href={`mailto:${church.email}`} className="flex items-center gap-2 break-all font-semibold text-forest-600">
                <Mail size={16} className="shrink-0" aria-hidden="true" />
                {church.email}
              </a>
            </div>
          )}
          <p className="mt-4 text-center text-sm">
            <Link href="/churches" className="text-forest-600">
              ← Back to all churches
            </Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
