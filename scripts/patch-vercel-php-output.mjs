import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputFunctions = path.resolve(".vercel/output/functions");
const bridgePath = "scripts/vercel-php-launcher.js";
const functionConfigs = [];

async function collectFunctionConfigs(directory) {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(
        "Vercel build output was not found. Run `vercel build --prod` first.",
      );
    }

    throw error;
  }

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await collectFunctionConfigs(entryPath);
    } else if (entry.name === ".vc-config.json") {
      functionConfigs.push(entryPath);
    }
  }
}

await collectFunctionConfigs(outputFunctions);

let patchedCount = 0;

for (const configPath of functionConfigs) {
  const config = JSON.parse(await readFile(configPath, "utf8"));

  if (
    config.handler !== "launcher.launcher" &&
    config.awsLambdaHandler !== "launcher.launcher"
  ) {
    continue;
  }

  if (!config.filePathMap || typeof config.filePathMap !== "object") {
    throw new Error(`PHP function is missing filePathMap: ${configPath}`);
  }

  const originalLauncherPath =
    config.filePathMap["launcher-orig.js"] || config.filePathMap["launcher.js"];

  if (!originalLauncherPath) {
    throw new Error(`PHP launcher.js was not found in filePathMap: ${configPath}`);
  }

  config.filePathMap["launcher-orig.js"] = originalLauncherPath;
  config.filePathMap["launcher.js"] = bridgePath;
  config.handler = "launcher.js";
  config.launcherType = "Nodejs";
  config.awsLambdaHandler = "launcher.launcher";

  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
  patchedCount += 1;
}

if (patchedCount === 0) {
  throw new Error(
    "No Vercel PHP function was found to patch. Check the vercel-php runtime and build output.",
  );
}

console.log(`Patched ${patchedCount} Vercel PHP function(s).`);
