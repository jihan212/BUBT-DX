import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const Form = FormProvider;

const FormField = ({ ...props }) => {
	return <Controller {...props} />;
};

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn('space-y-2', className)}
			{...props}
		/>
	);
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<Label
			ref={ref}
			className={cn(className)}
			{...props}
		/>
	);
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef(({ ...props }, ref) => {
	return (
		<Slot
			ref={ref}
			{...props}
		/>
	);
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef(
	({ className, children, ...props }, ref) => {
		return (
			<p
				ref={ref}
				className={cn(
					'text-sm font-medium text-destructive',
					className
				)}
				{...props}
			>
				{children}
			</p>
		);
	}
);
FormMessage.displayName = 'FormMessage';

export {
	useFormContext,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormField,
	FormMessage,
};
