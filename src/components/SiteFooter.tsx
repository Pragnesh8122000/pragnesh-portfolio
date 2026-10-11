import { footer } from '../content/portfolio';

export function SiteFooter() {
  return (
    <footer className="border-t border-rule py-8">
      <div className="container-page">
        <div className="flex flex-col gap-1 md:flex-row md:justify-between">
          <p className="t-body m-0 font-bold">{footer.left}</p>
          <p className="t-body m-0 text-muted">{footer.right}</p>
        </div>
      </div>
    </footer>
  );
}
