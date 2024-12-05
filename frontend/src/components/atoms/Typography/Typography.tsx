import React from "react";

export enum TypographyVariant {
  H1 = "H1",
  H2 = "H2",
  P = "P",
}

interface ITypographyProps extends React.PropsWithChildren {
  variant: TypographyVariant;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant,
  children,
}) => {
  return (
    <>
      {variant == TypographyVariant.H1 && <h1>{children}</h1>}
      {variant == TypographyVariant.H2 && <h2>{children}</h2>}
      {variant == TypographyVariant.P && <p>{children}</p>}
    </>
  );
};
