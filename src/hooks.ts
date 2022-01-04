import type { DocsFileToFrontmatterMap } from "$lib/types/docs-menu.type";
import { sequence } from "@sveltejs/kit/hooks";

export const getSession: import("@sveltejs/kit").GetSession = async (
  request
) => {
  return {
    changelogEntries: request.locals.changelogEntries,
    posts: request.locals.posts,
    guides: request.locals.guides,
    docsFileToFrontmatterMap: request.locals.docsFileToFrontmatterMap,
  };
};

const handleDocsMenu = async ({ request, resolve }) => {
  const docsFileToFrontmatterMap: DocsFileToFrontmatterMap = {};
  const docsPages = await import.meta.glob("/src/routes/docs/**/*.md");
  for (const path in docsPages) {
    const page = await docsPages[path]();
    if (
      page.metadata &&
      (page.metadata.section === "/" || page.metadata.section === "editors")
    ) {
      docsFileToFrontmatterMap[path.substring("/src/routes/docs/".length)] =
        page.metadata;
    }
  }

  request.locals.docsFileToFrontmatterMap = docsFileToFrontmatterMap;
  return await resolve(request);
};

const handleBlogPosts = async ({ request, resolve }) => {
  const posts = await Promise.all(
    Object.entries(import.meta.glob("/src/routes/blog/*.md")).map(
      async ([path, page]) => {
        const { metadata } = await page();
        const filename = path.split("/").pop();
        return { ...metadata, filename };
      }
    )
  );
  posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  request.locals.posts = posts;
  return await resolve(request);
};

const handleChangelogEntries = async ({ request, resolve }) => {
  const changelogEntries = await Promise.all(
    Object.entries(import.meta.glob("/src/lib/contents/changelog/*.md")).map(
      async ([, mod]) => {
        const { default: content, metadata } = await mod();
        return {
          ...metadata,
          content: content.render().html,
        };
      }
    )
  );
  changelogEntries.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  request.locals.changelogEntries = changelogEntries;
  return await resolve(request);
};

const handleGuides = async ({ request, resolve }) => {
  const guides = await Promise.all(
    Object.entries(import.meta.glob("/src/routes/guides/*.md")).map(
      async ([path, page]) => {
        const { metadata } = await page();
        const filename = path.split("/").pop();
        return { ...metadata, filename };
      }
    )
  );
  guides.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  request.locals.guides = guides;
  return await resolve(request);
};

const handleHeaders = async ({ request, resolve }) => {
  const response = await resolve(request);

  return {
    ...response,
    headers: {
      ...response.headers,
      "Set-Cookie":
        "gitpod-marketing-website-visited=true; Domain=.gitpod.io; Path=/",
      // Avoid clickjacking attacks, see https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html
      "Content-Security-Policy": "frame-ancestors *.gitpod.io;",
    },
  };
};

export const handle = sequence(
  handleHeaders,
  handleBlogPosts,
  handleChangelogEntries,
  handleGuides,
  handleDocsMenu
);
