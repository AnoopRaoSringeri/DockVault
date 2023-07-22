import React, { memo } from "react";
import {
  IconProp,
  RotateProp,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// export class IconRegistry {
//   static get Icons(): IconDefinition[] {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return (window as any).IconRegistry as IconDefinition[];
//   }
// }
export interface IconProps {
  icon: IconProp;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeProp;
  color?: string;
  rotation?: RotateProp;
}
export const Icon: React.FC<IconProps> = memo(function Icon({
  icon,
  className,
  rotation,
  style,
  size,
  color,
}: IconProps) {
  return icon != null ? (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      style={style}
      rotation={rotation}
      size={size}
      color={color}
    />
  ) : (
    <></>
  );
});
