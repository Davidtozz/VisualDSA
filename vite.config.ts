import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import * as child_process from 'node:child_process';



if (process.env.VITE_GIT_COMMIT_REF === undefined) {
	process.env.VITE_GIT_COMMIT_REF = child_process
	  .execSync('git rev-parse --short HEAD')
	  .toString();
}

export default defineConfig({
	plugins: [sveltekit()]
});
