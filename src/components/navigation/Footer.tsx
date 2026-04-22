import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/ui/Icon";

// Only verified offices are listed with address/phone. The existence of
// Høvik and Trondheim offices is confirmed on bestgroup.no, but exact
// street addresses have not been verified — so we name the city only.
const VERIFIED_OFFICES = [
  {
    name: "Larvik (hovedkontor)",
    street: "Elveveien 52",
    postal: "Postboks 2147 Stubberød",
    cityLine: "3255 Larvik",
    phone: "+47 33 13 52 90",
  },
];

const OTHER_CITIES = ["Høvik", "Trondheim"];

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="relative mt-20 overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 grid-bg opacity-10" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-[50%] bg-cyan-500/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative grid grid-cols-1 gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="dark" />
          <p className="mt-6 max-w-sm text-sm text-navy-100/80">
            {t("parent")} — markedsledende i Skandinavia innen pasientvarsling
            og kommunikasjonsløsninger for helsesektoren siden 1979.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="mailto:post@bestgroup.no"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm hover:border-cyan-400 hover:text-cyan-300"
            >
              <MailIcon size={16} />
              post@bestgroup.no
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              {nav("products")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-navy-100/80">
              <li>
                <Link href="/produkter" className="hover:text-cyan-300">
                  BEST IQ
                </Link>
              </li>
              <li>
                <Link href="/produkter" className="hover:text-cyan-300">
                  BESTsenior
                </Link>
              </li>
              <li>
                <Link href="/produkter" className="hover:text-cyan-300">
                  BESTinfotainment
                </Link>
              </li>
              <li>
                <Link href="/produkter" className="hover:text-cyan-300">
                  BESTproactive
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Selskap
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-navy-100/80">
              <li>
                <Link href="/om" className="hover:text-cyan-300">
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link href="/referanser" className="hover:text-cyan-300">
                  {nav("references")}
                </Link>
              </li>
              <li>
                <Link href="/karriere" className="hover:text-cyan-300">
                  {nav("careers")}
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-cyan-300">
                  {nav("support")}
                </Link>
              </li>
              <li>
                <Link href="/sikkerhet" className="hover:text-cyan-300">
                  Sikkerhet og personvern
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              {t("offices")}
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-4 text-sm text-navy-100/80 md:grid-cols-3">
              {VERIFIED_OFFICES.map((o) => (
                <li key={o.name}>
                  <p className="font-semibold text-white">{o.name}</p>
                  <p className="mt-1 flex items-start gap-1.5">
                    <MapPinIcon
                      size={14}
                      className="mt-0.5 shrink-0 text-cyan-400"
                    />
                    <span>
                      {o.street}
                      <br />
                      {o.postal && (
                        <>
                          {o.postal}
                          <br />
                        </>
                      )}
                      {o.cityLine}
                    </span>
                  </p>
                  <p className="mt-1 flex items-center gap-1.5">
                    <PhoneIcon size={14} className="text-cyan-400" />
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`}>{o.phone}</a>
                  </p>
                </li>
              ))}
              {OTHER_CITIES.map((city) => (
                <li key={city}>
                  <p className="font-semibold text-white">{city}</p>
                  <p className="mt-1 text-xs text-navy-100/60">
                    Kontakt hovedkontor for informasjon.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-navy-100/60 md:flex-row">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>
            {t("orgNr")}: 974 428 393 ·{" "}
            <a
              href="https://www.bestgroup.no"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300"
            >
              bestgroup.no
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
