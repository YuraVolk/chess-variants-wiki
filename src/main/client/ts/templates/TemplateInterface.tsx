import React, { createElement } from "react";
import { importAll } from "../baseTypes";

class TemplateErrorBoundary extends React.Component<{ children: JSX.Element }, { crashed: boolean }> {
	constructor(props: { children: JSX.Element }) {
		super(props);
		this.state = { crashed: false };
	}

	static getDerivedStateFromError() {
		return { crashed: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.debug(error);
		console.trace(errorInfo);
	}

	render() {
		if (this.state.crashed) return null;
		try {
			return this.props.children;
		} catch (e) {
			console.trace(e);
			return null;
		}
	}
}

export enum ComponentModifier {
	ADVANCED,
	RESTRICTED_ACCESS
}

type LowercaseObject<T extends object> = { [K in keyof T as K extends string ? Lowercase<K> : never]: T[K] };
type EnforceLowerCaseProps<T extends object> = LowercaseObject<T> extends T ? (T extends LowercaseObject<T> ? T : symbol) : symbol;
interface TemplateProps {
	[prop: string]: unknown;
	children?: JSX.Element | JSX.Element[];
}

export const templates: Partial<Record<keyof JSX.IntrinsicElements, React.ComponentType<any>>> = {};
export const addTemplate = <P extends object>(name: keyof JSX.IntrinsicElements, component: React.ComponentType<EnforceLowerCaseProps<P>>) => {
	const newComponent = (props: TemplateProps & EnforceLowerCaseProps<P>) => {
		return <TemplateErrorBoundary>{createElement(component, props, props.children)}</TemplateErrorBoundary>;
	};

	if (!(name in templates)) {
		templates[name] = newComponent;
	}

	return newComponent;
};

importAll(require.context("./", true, /\.tsx$/));
