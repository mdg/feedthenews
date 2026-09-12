# Feed The News

UI for [feedthenews.org](https://www.feedthenews.org/)

## Creating a project

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

To recreate this project with the same configuration:

```sh
# recreate this project
pnpm dlx sv@0.17.0 create --template minimal --types ts --add prettier vitest="usages:unit,component" tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:node" paraglide="languageTags:en, es+demo:yes" storybook --install pnpm ftnui
```

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```sh
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
