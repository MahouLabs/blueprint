// env.ts

type EnvVars = Record<string, string | undefined>;

/**
 * Gets environment variables based on the execution environment.
 * For local development (Vite), variables must be prefixed with VITE_.
 * For production (Cloudflare), variables are accessed directly.
 *
 * @param keys The names of the environment variables to access.
 * @returns An object with the environment variables as keys.
 */
function getEnvVars(keys: string[]): EnvVars {
  const envVars: EnvVars = {};

  for (const key of keys) {
    // Determine if we're running in a Cloudflare environment by checking the presence of the ENV global object
    // Note: Adjust the type assertion as necessary depending on your environment detection logic
    const isCloudflareEnv = typeof (globalThis as any).ENV !== 'undefined';

    // Adjust the key for local development since Vite exposes env vars prefixed with VITE_
    const viteKey = `VITE_${key}`;

    if (isCloudflareEnv) {
      // Accessing variables in Cloudflare environment
      // You may need to adjust this if your Cloudflare setup uses a different method to expose env vars
      envVars[key] = (globalThis as any).ENV[key];
    } else {
      // Accessing variables in local development with Vite
      // Ensure your Vite config correctly loads these variables for this to work
      envVars[key] = import.meta.env[viteKey];
      console.log(import.meta.env);
      console.log(viteKey)
    }
  }

  console.log(envVars);

  return envVars;
}

export default getEnvVars;
