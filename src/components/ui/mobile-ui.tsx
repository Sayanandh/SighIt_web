import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface MobileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
}

export const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('w-full rounded-xl', className)}
        {...props}
      />
    );
  }
);
MobileButton.displayName = 'MobileButton';

export interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  to?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  delay?: number;
}

export const MobileCard = React.forwardRef<HTMLDivElement | HTMLAnchorElement, MobileCardProps>(
  ({ className, to, icon, title, description, delay = 0, ...props }, ref) => {
    const Comp: React.ElementType = to ? Link : 'div';
    const cardProps = to ? ({ to } as React.ComponentProps<typeof Link>) : {};

    return (
      <Comp
        ref={ref as React.Ref<HTMLDivElement & HTMLAnchorElement>}
        className={cn(
          'block rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md slide-up-mobile',
          className
        )}
        style={{ animationDelay: `${delay}ms` }}
        {...cardProps}
        {...props}
      >
        <div className="flex items-start gap-4">
          {icon && (
            <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-lg">
              {icon}
            </div>
          )}
          <div>
            {title && <h3 className="font-semibold mb-1">{title}</h3>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </Comp>
    );
  }
);
MobileCard.displayName = 'MobileCard';

export const MobileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props} />
));
MobileCardContent.displayName = 'MobileCardContent';

export const MobileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center justify-center mt-4', className)} {...props} />
));
MobileCardFooter.displayName = 'MobileCardFooter';
