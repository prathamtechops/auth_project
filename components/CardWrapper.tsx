"use client";

import React from "react";
import BackButton from "./BackButton";
import Header from "./Header";
import SocialButtons from "./SocialButons";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLable: string;
  backButtonLabel: string;
  headerTitle: string;
  backButtonHref: string;
  showSocialLinks?: boolean;
}
export const CardWrapper = ({
  children,
  headerLable,
  headerTitle,
  backButtonLabel,
  showSocialLinks = false,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLable} header={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocialLinks && (
        <CardFooter>
          <SocialButtons />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
