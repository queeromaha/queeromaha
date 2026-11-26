// voidflow settings for this repo; `kind` picks the defaults: https://github.com/taraxvoid/voidflow/blob/main/docs/config.md

import type { VoidflowConfig } from '@taraxvoid/voidflow/config'

// The Netlify GitHub app still deploys queeromaha.net (blue) until cutover, so
// it must be able to bypass the main ruleset. Drop it with netlify.toml.
const NETLIFY = 13473

export default {
    kind: 'site',
    rulesets: {
        mergeQueue: true,
        bypass: {
            main: [
                {
                    actor_id: NETLIFY,
                    actor_type: 'Integration',
                    bypass_mode: 'always',
                },
            ],
        },
    },
    cloudflare: {
        account: '0c7d38ef823510f544ac4ecfc311badc',
        adminTokenEnv: 'CF_TOKEN_ADMIN',
        envs: [
            // The queeromaha-net Worker and queeromaha.dev from wrangler.jsonc.
            { env: 'prod' },
            // Worker Previews (pr-<number>) deploy no routes. The token is a
            // repository secret because the preview job reads it from a PR.
            { env: 'preview', secret: 'repo', zones: [] },
        ],
        retire: ['queeromaha-dev-worker-edit'],
    },
} satisfies VoidflowConfig
