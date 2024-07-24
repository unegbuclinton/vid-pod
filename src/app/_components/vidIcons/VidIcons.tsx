import { icons } from "./svg";

export default function VdIcon({ iconName }: { iconName: string }) {
  return <i>{icons[iconName]}</i>;
}
