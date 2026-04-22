import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/Icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactForm" });
  return { title: t("title"), description: t("subtitle") };
}

// Only the Larvik HQ address is verified. Other cities confirmed via
// bestgroup.no but without verified street addresses.
const HEADQUARTERS = {
  name: "Larvik (hovedkontor)",
  street: "Elveveien 52",
  postal: "Postboks 2147 Stubberød, 3255 Larvik",
  phone: "+47 33 13 52 90",
  email: "post@bestgroup.no",
};

const ADDITIONAL_CITIES = ["Høvik", "Trondheim"];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactForm");

  return (
    <>
      <section className="border-b border-navy-900/5 bg-paper-alt py-16 pt-32">
        <Container>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
            <span className="h-1 w-6 rounded-full bg-cyan-500" />
            {t("title")}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-navy-900 md:text-5xl">
            Snakk med vårt team om pasientvarsling
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-muted">{t("subtitle")}</p>
        </Container>
      </section>

      <Container className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <ContactForm />
        </div>
        <aside className="space-y-10">
          <div>
            <h2 className="text-lg font-bold text-navy-900">Hovedkontor</h2>
            <div className="mt-6 rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-navy-900">{HEADQUARTERS.name}</h3>
              <p className="mt-3 flex items-start gap-2 text-sm text-ink-muted">
                <MapPinIcon size={16} className="mt-0.5 text-cyan-600" />
                <span>
                  {HEADQUARTERS.street}
                  <br />
                  {HEADQUARTERS.postal}
                </span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
                <PhoneIcon size={16} className="text-cyan-600" />
                <a
                  href={`tel:${HEADQUARTERS.phone.replace(/\s/g, "")}`}
                  className="hover:text-navy-900"
                >
                  {HEADQUARTERS.phone}
                </a>
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
                <MailIcon size={16} className="text-cyan-600" />
                <a
                  href={`mailto:${HEADQUARTERS.email}`}
                  className="hover:text-navy-900"
                >
                  {HEADQUARTERS.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-navy-900">Andre kontorer</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {ADDITIONAL_CITIES.map((city) => (
                <li
                  key={city}
                  className="rounded-xl border border-navy-900/5 bg-white p-4 text-center shadow-sm"
                >
                  <p className="text-sm font-semibold text-navy-900">{city}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Kontakt hovedkontoret så setter vi deg i kontakt med riktig
              lokasjon.
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
