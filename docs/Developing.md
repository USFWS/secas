# Development environment and technical details

## Technical architecture

This website uses [Svelte](https://svelte.dev/) for the user interface, which is
built as a static web application where web assets are built in advance in a
dedicated build step.

The website is composed of different categories of content, which are each
managed differently. See [README.md](./README.md) for an overview.

The story map requires additional processing, which requires a Python development
environment. See [StoryMap.md](./StoryMap.md) for more information

## Local development environment

### NodeJS

This project requires the NodeJS version specified in `.nvmrc`. For convenience,
NodeJS can be managed using [nvm](https://github.com/nvm-sh/nvm). Install `nvm`
and then run:

```bash
nvm install
nvm use
```

To activate that version of NodeJS each time you open this project, use

```bash
nvm use
```

### Environment variables

Create `.env.development` file with the following entry:

```bash
PUBLIC_MAPBOX_TOKEN=<mapbox token>
```

### Development server

```bash
nvm use
npm run dev -- --open
```

This will start the user interface development server and open it in your browser
at `http://localhost:5173/`. In general, this will "hot reload" changes as you
edit any of the source files or content.

Note: images render more slowly using the development server. This is expected.
They will be optimized and much faster when running the production build.

### Production user interface build & preview

You will need to create a `.env.production` file that contains the same variables
as the `.env.development` above and the following entries:

```bash
PUBLIC_SENTRY_DSN=<sentry DSN created for project at https://sentry.io>
PUBLIC_GOOGLE_ANALYTICS_ID=<google analytics ID>
```

```bash
nvm use
npm run build ; and npm run preview -- --open
```

This will run the user interface build step and then open the preview server
in your browser at `http://localhost:4173/`. This is the built version of the
site and has been much more optimized than the development server. Check for
any slowness or errors.

## Production environment

The website is hosted using Github. It uses Github actions to run the build step
to transform the Svelte application into static web assets (HTML / CSS /
Javascript / etc) that are then hosted by Github.

To configure the production environment:

- Enable actions: Go to `https://github.com/usfws/secas/settings/actions` and choose "Allow all actions and reusable workflows" at the top
- Enable build from Github actions: Go to `https://github.com/usfws/secas/settings/pages` and choose "Github Actions" in the dropdown for Source under "Build and deployment"
- Edit or enable github pages environment and source branches for build: Go to `https://github.com/usfws/secas/settings/environments` and select the `github-pages` environment if it exists, or create a new environment with that name. Then in the "Deployment branches and tags" section, use the "Add deployment branch or tag rule" button to add `main` and any other branches that are allowed to publish changes to the website
- Set repository secrets: Go to `https://github.com/usfws/secas/settings/secrets/actions` and add the following entries and their values in the "Repository secrets" section:
  - `PUBLIC_MAPBOX_TOKEN`
  - `PUBLIC_SENTRY_DSN`
  - `PUBLIC_GOOGLE_ANALYTICS_ID`

- Set website deploy path: Go to `https://github.com/usfws/secas/settings/variables/actions` and add the following entry in the "Repository variables" section:
  - `PUBLIC_CONTACT_EMAIL`
  - `PUBLIC_SITE_URL`

Github is configured to deploy from the `gh-pages` branch. This setting is controlled
in `.github/workflows/build.yml`.

After pushing changes to the `gh-pages` branch, you can watch the Actions workflows
at `https://github.com/usfws/secas/actions` to determine if the
build is in progress, succeeded, or failed.
