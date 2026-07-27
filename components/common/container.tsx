import React, { ReactNode, ElementType, ComponentPropsWithoutRef } from "react";

// 1. Define only the unique props your container component introduces
interface BaseContainerProps {
  className?: string;
  children?: ReactNode;
}

// 2. Combine base props with the dynamic HTML tag props, omitting duplicates
export type ContainerProps<T extends ElementType> = BaseContainerProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseContainerProps | "as">;

// 3. Implement the component with a default fallback to a 'div' element
export function Container<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...props
}: ContainerProps<T>) {
  // 4. FIX: Cast to any or ComponentType to bypass strict internal JSX child checking
  const ComponentTag = (as || "div") as any;

  return (
    <ComponentTag className={className} {...props}>
      {children}
    </ComponentTag>
  );
}
