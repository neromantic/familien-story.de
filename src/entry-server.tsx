import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

/**
 * Renders one route to static HTML for the build-time prerender step.
 * The language is chosen by the prerender script via `__PRERENDER_LANG__`,
 * because the localized strings are set at module scope.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
