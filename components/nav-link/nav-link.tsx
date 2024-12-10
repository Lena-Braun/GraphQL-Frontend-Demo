import { forwardRef, Button, ButtonProps } from "@chakra-ui/react";

import Link from "next/link";

export interface NavLinkProps extends ButtonProps {
  isActive?: boolean;
  href?: string;
  id?: string;
}

export const NavLink = forwardRef<NavLinkProps, "a">((props, ref) => {
  const { href, type, isActive, ...rest } = props;
  return (
    <Button
      as={Link}
      href={href}
      ref={ref}
      height={'auto'}
      variant="nav-link"
      isActive={isActive}
      fontWeight="medium"
      fontSize={16}
      p='10px 20px'
      borderRadius={50}
      {...rest}
    />
  );
});

NavLink.displayName = "NavLink";
