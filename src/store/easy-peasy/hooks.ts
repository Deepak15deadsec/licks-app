import { createTypedHooks } from "easy-peasy";
import { EasyPeasyStore } from ".";
const { useStoreState, useStoreActions } = createTypedHooks<EasyPeasyStore>();
export { useStoreState, useStoreActions };