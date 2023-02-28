import * as icons from "react-bootstrap-icons";

interface IconProps extends icons.IconProps {
  icon: keyof typeof icons;
}

const Icon = ({ icon, ...props }: IconProps) => {
  const BootstrapIcon = icons[icon];
  return <BootstrapIcon {...props} />;
};

export default Icon;
