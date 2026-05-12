import { callExtract, callGenerate, callRefine } from "./providers";
import { getMockHooks, getMockVariants, getMockRefinedVariants } from "./mock-data";

export async function extractHooks(provider, apiKey, text, images = []) {
  if (provider !== "mock") {
    const result = await callExtract(provider, apiKey, text, images);
    if (result) return result;
  }
  return getMockHooks(text, images);
}

export async function generateAdVariants(provider, apiKey, hooks) {
  if (provider !== "mock") {
    const result = await callGenerate(provider, apiKey, hooks);
    if (result) return result;
  }
  return getMockVariants(hooks);
}

export async function refineWithHook(provider, apiKey, hook, hooks) {
  if (provider !== "mock") {
    const result = await callRefine(provider, apiKey, hook);
    if (result) return result;
  }
  return getMockRefinedVariants(hook, hooks);
}
