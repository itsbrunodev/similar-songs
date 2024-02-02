# Similar Songs 🎶

Find 50 AI-matched tracks on Spotify that match the vibe of your favorites.

## Features

- Song previews
- 50 similar songs
- User friendly searching
- _Spotify playlist integration_ (to-do)

## Preview

Here's a preview of what songs similar to another song look like on the website.

<a href="https://similar-songs.itsbruno.dev/track/3gY6tiCNsuVi6s8kPV6aQg" target="_blank"><img style="border-radius:1rem;" src="assets/preview.png" alt="Similar Songs preview"></a>

## Running Locally

### Prerequisites

- Create an application on the <a href="https://developer.spotify.com/dashboard/create" target="_blank">Spotify Developer</a> website. Copy the **client ID** and the **client secret** and add them to the `.env.local` file (rename the `.env.template` file) as environment variables.
- (Optional) <a href="https://pnpm.io/" target="_blank">pnpm package manager</a>

### Running

> [!NOTE]  
> This project uses pnpm as the package manager, but other package managers can be used as well.

To run this project locally, first install the required packages

```bash
pnpm install
```

Then, run the project in the development environment

```bash
pnpm dev
```

If you want to run the project in the production environment

```bash
pnpm build
pnpm start
```

### License

<a href="https://choosealicense.com/licenses/gpl-3.0/" target="_blank">GNU General Public License v3.0</a>

---

<a href="https://nextjs.org"><img src="assets/badges/built-with-nextjs.svg" alt="Built with Next.js"></a>
<a href="https://tailwindcss.com"><img src="assets/badges/styled-with-tailwindcss.svg" alt="Styled with Tailwind CSS"></a>
<a href="https://spotify.com"><img src="assets/badges/powered-by-spotify.svg" alt="Powered by Spotify"></a>
<a href="https://similar-songs.itsbruno.dev"><img src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/compact/documentation/website_vector.svg" alt="Visit the Website"></a>
