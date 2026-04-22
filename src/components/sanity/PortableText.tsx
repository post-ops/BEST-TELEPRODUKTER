import {
  PortableText as PortableTextBase,
  type PortableTextComponents,
} from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-muted">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold text-navy-900 md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-bold text-navy-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-cyan-500 pl-6 text-lg italic text-navy-900">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-muted">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink-muted">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-navy-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-cyan-700 underline decoration-cyan-500/50 underline-offset-2 hover:decoration-cyan-500"
      >
        {children}
      </a>
    ),
  },
};

export function PortableText({ value }: { value: unknown }) {
  if (!value) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableTextBase value={value as any} components={components} />;
}
