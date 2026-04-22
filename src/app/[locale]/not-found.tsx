import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
        Feil 404
      </p>
      <h1 className="text-4xl font-bold text-navy-900 md:text-6xl">
        Siden finnes ikke
      </h1>
      <p className="max-w-lg text-ink-muted">
        Lenken kan være utdatert eller feilskrevet. Gå tilbake til forsiden
        eller utforsk produktene våre.
      </p>
      <div className="mt-4 flex gap-3">
        <LinkButton href="/">Til forsiden</LinkButton>
        <LinkButton href="/produkter" variant="secondary">
          Se produkter
        </LinkButton>
      </div>
    </Container>
  );
}
