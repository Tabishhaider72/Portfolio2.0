/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

// Compatibility shim: declare the minimal types that some generated .next validators import
// This prevents TypeScript from erroring when Next generates imports from "next/types.js"
declare module "next/types.js" {
	// These are intentionally permissive — they only need to satisfy type checking for generated files.
	export type ResolvingMetadata = any;
	export type ResolvingViewport = any;
	const _default: any;
	export default _default;
}
